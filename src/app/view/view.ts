import { Customer } from '@commercetools/platform-sdk';
import DOMComponent from '../../components/base-component';
import Footer from './footer/footer';
import Header from './header/header';
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

  private static MAIN: DOMComponent<HTMLElement> | null = null;

  protected body: DOMComponent<HTMLElement>;

  protected router: AppRouter;

  public dataUser?: Customer | undefined;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    dataUser?: Customer | undefined
  ) {
    this.router = router;

    this.dataUser = dataUser;

    this.body = DOMComponent.FromElement(document.body);

    if (!AppView.HEADER) {
      AppView.HEADER = new Header(router, appInfo.name, categories, authParams);
      this.body.append(AppView.HEADER);
    }

    const newMain = this.createMain();
    newMain.addClass(ViewCssClasses.Main);
    if (!AppView.MAIN) {
      AppView.MAIN = newMain;
      this.body.append(AppView.MAIN);
    } else {
      AppView.MAIN.replaceWith(newMain);
      AppView.MAIN = newMain;
    }
    if (!AppView.FOOTER) {
      AppView.FOOTER = new Footer(router, appInfo);
      this.body.append(AppView.FOOTER);
    }
  }

  protected abstract createMain(): DOMComponent<HTMLElement>;

  public clear(): void {
    AppView.MAIN?.clear();
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
