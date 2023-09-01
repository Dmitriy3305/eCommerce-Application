import DOMComponent from '../../components/base-component';
import Footer from './footer/footer';
import Header from './header/header';
import { InsertPositions } from '../../types/dom-types/enums';
import AppRouter from '../router/router';
import { AppLink } from '../router/router-types';
import { GrouppedCategories } from '../api/products';
import { showErrorToastify, showSuccessToastify } from '../../utils/toastify';
import { AppInfo, AuthorizationParameters } from '../../types/app-parameters';
import '../styles/main.scss';

enum ViewCssClasses {
  Main = 'main',
}

export default abstract class AppView {
  private static HEADER: Header | null = null;

  private static FOOTER: Footer | null = null;

  protected body: DOMComponent<HTMLElement>;

  protected main: DOMComponent<HTMLElement>;

  protected router: AppRouter;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters
  ) {
    this.router = router;

    this.body = DOMComponent.FromElement(document.body);

    if (!AppView.HEADER) {
      AppView.HEADER = new Header(router, appInfo.name, categories, authParams);
      this.body.append(AppView.HEADER);
    }
    if (!AppView.FOOTER) {
      AppView.FOOTER = new Footer(router, appInfo);
      this.body.append(AppView.FOOTER);
    }

    this.main = this.createMain();
    this.main.addClass(ViewCssClasses.Main);
    AppView.FOOTER.insert(InsertPositions.Before, this.main);
  }

  protected abstract createMain(): DOMComponent<HTMLElement>;

  public clear(): void {
    this.main.remove();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  public switchActiveLink(link: AppLink, queries?: URLSearchParams): void {
    const url = queries?.size ? `${link}?${queries}` : link;
    if (Header.NAVIGATION_LINKS.includes(link)) AppView.HEADER?.switchActiveLink(url);
    else AppView.HEADER?.disableActiveLinks();

    if (Footer.NAVIGATION_LINKS.includes(link)) AppView.FOOTER?.switchActiveLink(url);
    else AppView.FOOTER?.disableActiveLinks();
  }

  public showError(message: string): void {
    showErrorToastify(message);
  }

  public showMessage(message: string): void {
    showSuccessToastify(message);
  }

  public switchNavigationLinks(): void {
    AppView.HEADER?.switchNavigationLinks();
  }
}
