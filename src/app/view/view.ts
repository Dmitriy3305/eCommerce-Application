import DOMComponent from '../../components/base-component';
import Footer from './footer/footer';
import Header from './header/header';
import { InsertPositions } from '../../types/dom-types/enums';
import AppRouter from '../router/router';
import { AppLink } from '../router/router-types';

enum ViewCssClasses {
  Main = 'main',
}

export default abstract class AppView {
  private static HEADER: Header | null = null;

  private static FOOTER: Footer | null = null;

  protected body: DOMComponent<HTMLElement>;

  protected main: DOMComponent<HTMLElement>;

  protected router: AppRouter;

  public constructor(router: AppRouter, appName: string, appDescription: string, categories: string[]) {
    this.router = router;

    this.body = DOMComponent.FromElement(document.body);

    if (!AppView.HEADER) {
      AppView.HEADER = new Header(router, appName, categories);
      this.body.append(AppView.HEADER);
    }
    if (!AppView.FOOTER) {
      AppView.FOOTER = new Footer(router, appName, appDescription);
      this.body.append(AppView.FOOTER);
    }

    this.main = this.createMain();
    this.main.addClass(ViewCssClasses.Main);
    AppView.FOOTER.insert(InsertPositions.Before, this.main);
  }

  protected abstract createMain(): DOMComponent<HTMLElement>;

  public clear(): void {
    this.main.remove();
  }

  public switchActiveLink(link: AppLink): void {
    if (Header.NAVIGATION_LINKS.includes(link)) AppView.HEADER?.switchActiveLink(link);
    else AppView.HEADER?.disableActiveLinks();

    if (Footer.NAVIGATION_LINKS.includes(link)) AppView.FOOTER?.switchActiveLink(link);
    else AppView.FOOTER?.disableActiveLinks();
  }
}
