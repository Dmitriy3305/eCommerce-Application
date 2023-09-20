import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import { AppInfo, AuthorizationParameters, CartParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import Basketful from './basketful';

export default class BasketView extends AppView {
  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    cartParameters: CartParameters
  ) {
    super(router, appInfo, categories, authParams, cartParameters);
  }

  protected createMain(cartParameters: unknown): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    const basketful = new Basketful(cartParameters as CartParameters, this.router);
    main.append(basketful);
    return main;
  }
}
