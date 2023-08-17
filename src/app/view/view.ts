import DOMComponent, { ElementParameters } from '../../components/base-component';
import { InsertPositions, Tags } from '../../types/dom-types/enums';
import AppRouter from '../router/router';

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

  private static HEADER: DOMComponent<HTMLElement> | null;

  private static FOOTER: DOMComponent<HTMLElement> | null;

  protected body: DOMComponent<HTMLElement>;

  protected main: DOMComponent<HTMLElement>;

  protected router: AppRouter;

  public constructor(router: AppRouter) {
    this.router = router;

    this.body = DOMComponent.FromElement(document.body);

    if (!AppView.HEADER)
      AppView.HEADER = new DOMComponent<HTMLElement>({ ...AppView.HEADER_PARAMS, parent: this.body });
    if (!AppView.FOOTER)
      AppView.FOOTER = new DOMComponent<HTMLElement>({ ...AppView.FOOTER_PARAMS, parent: this.body });

    this.main = this.createMain();
    this.main.addClass(ViewCssClasses.Main);
    AppView.FOOTER.insert(InsertPositions.Before, this.main);
  }

  protected abstract createMain(): DOMComponent<HTMLElement>;

  public clear(): void {
    this.main.remove();
  }
}
