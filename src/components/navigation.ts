import { Events, Tags } from '../types/dom-types/enums';
import DOMComponent, { ElementParameters } from './base-component';

enum NavigationCssClasses {
  Container = 'navigation',
  Link = 'navigation__link',
}

interface Router {
  navigate: (url: string) => void;
}

export default class Navigation extends DOMComponent<HTMLElement> {
  private static ELEMENT_PARAMS: ElementParameters = {
    tag: Tags.Navigation,
  };

  private static LINK_PARAMS: ElementParameters = {
    tag: Tags.Anchor,
    classList: [NavigationCssClasses.Link],
  };

  protected links: DOMComponent<HTMLAnchorElement>[];

  public constructor(links: string[], router?: Router) {
    super(Navigation.ELEMENT_PARAMS);
    this.links = links.map((linkURL) => {
      const link = new DOMComponent<HTMLAnchorElement>({
        ...Navigation.LINK_PARAMS,
        attributes: { href: linkURL },
        parent: this,
      });
      if (router)
        link.addEventListener(Events.Click, (event: Event) => {
          event.preventDefault();
          router.navigate(linkURL);
        });
      return link;
    });
  }
}
