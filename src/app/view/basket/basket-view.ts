import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import { AppInfo, AuthorizationParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import Basketful from './basketful';

export default class BasketView extends AppView {
  private main?: DOMComponent<HTMLElement>;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters
  ) {
    super(router, appInfo, categories, authParams);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    this.main = main;
    const basketful = new Basketful("timberland 6' premium boot");
    this.main?.append(basketful);
    return main;
  }
}
