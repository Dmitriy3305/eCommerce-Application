import DOMComponent from './base-component';

export default class RoutedComponent extends DOMComponent<HTMLElement> {
  protected links: Map<string, DOMComponent<HTMLElement>> = new Map();

  public switchActiveLink(url: string): void {
    this.disableActiveLinks();
    this.links.get(url)?.setAttribute('disabled', '');
  }

  public disableActiveLinks(): void {
    this.links.forEach((link) => link.removeAttribute('disabled'));
  }
}
