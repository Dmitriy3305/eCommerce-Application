import AppRouter from '../app/router/router';
import DOMComponent, { ElementParameters } from '../components/base-component';
import { Events, Tags } from '../types/dom-types/enums';

export default function createLink(
  params: ElementParameters,
  router: AppRouter,
  link: string
): DOMComponent<HTMLAnchorElement> {
  const linkElement = new DOMComponent<HTMLAnchorElement>({
    tag: Tags.Anchor,
    ...params,
  });
  linkElement.addEventListener(Events.Click, () => {
    router.navigate(link);
  });
  return linkElement;
}
