import DOMComponent, { ElementParameters } from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';

enum ViewCssClasses {
  Header = 'header',
  Main = 'main',
  Footer = 'footer',
}

export default abstract class AppView {
  private static HEADER_PARAMS: ElementParameters = {
    tag: Tags.Header,
    classList: [ViewCssClasses.Header],
  };

  private static FOOTER_PARAMS: ElementParameters = {
    tag: Tags.Footer,
    classList: [ViewCssClasses.Footer],
  };

  protected body: DOMComponent<HTMLElement>;

  protected header: DOMComponent<HTMLElement>;

  protected main: DOMComponent<HTMLElement>;

  protected footer: DOMComponent<HTMLElement>;

  public abstract get pageName(): string;

  public constructor(appName: string) {
    this.body = DOMComponent.FromElement(document.body);
    this.setPageName(appName);

    this.header = new DOMComponent<HTMLElement>({ ...AppView.HEADER_PARAMS, parent: this.body });

    this.main = this.createMain();
    this.main.addClass(ViewCssClasses.Main);
    this.body.append(this.main);

    this.footer = new DOMComponent<HTMLElement>({ ...AppView.FOOTER_PARAMS, parent: this.body });
  }

  protected abstract createMain(): DOMComponent<HTMLElement>;

  // Should go to router?
  private setPageName(appName: string): void {
    document.title = `${appName} | ${this.pageName}`;
  }
}
