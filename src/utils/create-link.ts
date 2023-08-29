import AppRouter from '../app/router/router';
import DOMComponent, { ElementParameters } from '../components/base-component';
import { Events, Tags } from '../types/dom-types/enums';

export default function createLink(
  params: ElementParameters,
  router: AppRouter,
  link: string
): DOMComponent<HTMLAnchorElement> {
  const attributes = { ...params.attributes, href: link };
  const linkElement = new DOMComponent<HTMLAnchorElement>({
    tag: Tags.Anchor,
    ...params,
    attributes,
  });
  linkElement.addEventListener(Events.Click, (event: Event) => {
    event.preventDefault();
    router.navigate(link);
  });
  return linkElement;
}
