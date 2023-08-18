import DOMComponent from '../../components/base-component';
import { AppLink } from '../router/router-types';

export default class RoutedComponent extends DOMComponent<HTMLElement> {
  protected links: Map<AppLink, DOMComponent<HTMLElement>> = new Map();

  public switchActiveLink(url: AppLink): void {
    this.disableActiveLinks();
    this.links.get(url)?.setAttribute('disabled', '');
  }

  public disableActiveLinks(): void {
    this.links.forEach((link) => link.removeAttribute('disabled'));
  }
}
