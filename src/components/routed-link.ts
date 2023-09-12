import { Events, Tags } from '../types/dom-types/enums';
import { Router } from '../types/router';
import DOMComponent, { ElementParameters } from './base-component';

export default class RoutedLink extends DOMComponent<HTMLAnchorElement> {
  public constructor(parameters: Omit<ElementParameters, 'tag'>, link: string, router: Router) {
    const params = parameters;
    const url = router.getAbsoluteLink(link);
    if (params.attributes) params.attributes.href = link;
    else params.attributes = { href: url };

    super({
      tag: Tags.Anchor,
      ...params,
    });

    this.addEventListener(Events.Click, (event: Event) => {
      event.preventDefault();
      router.navigate(url);
    });
  }
}
