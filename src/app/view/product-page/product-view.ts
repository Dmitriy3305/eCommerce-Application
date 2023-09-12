import { Product } from '@commercetools/platform-sdk';
import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import InfoProduct from './info-product';
import { AppInfo, AuthorizationParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';

export default class ProductView extends AppView {
  private main?: DOMComponent<HTMLElement>;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters
  ) {
    super(router, appInfo, categories, authParams);
  }

  public set product(value: Product) {
    const productInfo = new InfoProduct(value);
    this.main?.append(productInfo);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    this.main = main;
    return main;
  }
}
