import DOMComponent from '../../components/base-component';
import Footer from './footer/footer';
import Header from './header/header';

enum ViewCssClasses {
  Main = 'main',
}

export default abstract class AppView {
  protected body: DOMComponent<HTMLElement>;

  protected header: Header;

  protected main: DOMComponent<HTMLElement>;

  protected footer: Footer;

  public abstract get pageName(): string;

  public constructor(appName: string, appDescription: string) {
    this.body = DOMComponent.FromElement(document.body);
    this.setPageName(appName);

    this.header = new Header(appName);
    this.body.append(this.header);

    this.main = this.createMain();
    this.main.addClass(ViewCssClasses.Main);
    this.body.append(this.main);

    this.footer = new Footer(appName, appDescription);
    this.body.append(this.footer);
  }

  protected abstract createMain(): DOMComponent<HTMLElement>;

  // Should go to router?
  private setPageName(appName: string): void {
    document.title = `${appName} | ${this.pageName}`;
  }
}
