import { Events, Tags } from '../types/dom-types/enums';
import { Router } from '../types/router';
import DOMComponent, { ElementParameters } from './base-component';
import RoutedLink from './routed-link';

enum NavigationCssClasses {
  Container = 'navigation',
  Link = 'navigation__link',
}

export default class Navigation extends DOMComponent<HTMLElement> {
  private static ELEMENT_PARAMS: ElementParameters = {
    tag: Tags.Navigation,
  };

  private static LINK_PARAMS: ElementParameters = {
    tag: Tags.Anchor,
    classList: [NavigationCssClasses.Link],
  };

  protected links: (DOMComponent<HTMLAnchorElement> | RoutedLink | DOMComponent<HTMLButtonElement>)[];

  public constructor(links: string[], router?: Router) {
    super(Navigation.ELEMENT_PARAMS);
    this.links = links.map((linkURL) => {
      const parameters = { ...Navigation.LINK_PARAMS, parent: this };
      const link = router
        ? new RoutedLink(parameters, linkURL, router)
        : new DOMComponent<HTMLAnchorElement>({
            ...parameters,
            attributes: { href: linkURL },
          });
      return link;
    });
  }

  public addButton(clickCallback: () => void): void {
    const button = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [NavigationCssClasses.Link],
    });
    button.addEventListener(Events.Click, clickCallback);
    this.links.push(button);
    this.append(button);
  }
}
