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
      const attributes = router ? undefined : { href: linkURL };
      const link = new DOMComponent<HTMLAnchorElement>({
        ...Navigation.LINK_PARAMS,
        attributes,
        parent: this,
      });
      if (router)
        link.addEventListener(Events.Click, () => {
          router.navigate(linkURL);
        });
      return link;
    });
  }
}
