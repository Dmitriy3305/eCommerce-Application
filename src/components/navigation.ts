import { Tags } from '../types/dom-types/enums';
import DOMComponent, { ElementParameters } from './base-component';

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

  protected links: DOMComponent<HTMLAnchorElement>[];

  public constructor(links: string[]) {
    super(Navigation.ELEMENT_PARAMS);
    this.links = links.map(
      (linkURL) =>
        new DOMComponent<HTMLAnchorElement>({
          ...Navigation.LINK_PARAMS,
          attributes: {
            href: linkURL,
          },
          parent: this,
        })
    );
  }
}
