import DOMComponent from '../../components/base-component';
import Footer from './footer/footer';
import Header from './header/header';
import { InsertPositions } from '../../types/dom-types/enums';
import AppRouter from '../router/router';

enum ViewCssClasses {
  Main = 'main',
}

export default abstract class AppView {
  private static HEADER: Header | null;

  private static FOOTER: Footer | null;

  protected body: DOMComponent<HTMLElement>;

  protected main: DOMComponent<HTMLElement>;

  protected router: AppRouter;

  public constructor(router: AppRouter, appName: string) {
    this.body = DOMComponent.FromElement(document.body);

    if (!AppView.HEADER)
      AppView.HEADER = new Header();
    if (!AppView.FOOTER)
      AppView.FOOTER = new Footer();

    this.main = this.createMain();
    this.main.addClass(ViewCssClasses.Main);
    AppView.FOOTER.insert(InsertPositions.Before, this.main);
  }

  protected abstract createMain(): DOMComponent<HTMLElement>;

  public clear(): void {
    this.main.remove();
  }
}
