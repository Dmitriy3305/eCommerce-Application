import { ProductProjection } from '@commercetools/platform-sdk';
import DOMComponent from '../../../components/base-component';
import InfoProduct from './info-product';
import BreadcrumbedView from '../breadcrumbed-view';
import { AppInfo, AuthorizationParameters, CartParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import { CartProduct } from '../../../types/cart-product';

export default class ProductView extends BreadcrumbedView {
  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    cartParameters: CartParameters,
    product: ProductProjection | CartProduct
  ) {
    super(router, appInfo, categories, authParams, [cartParameters, product]);
  }

  protected override createMain(data?: unknown): DOMComponent<HTMLElement> {
    const [cartParams, product] = data as [CartParameters, ProductProjection | CartProduct];
    const main = super.createMain();
    main.append(new InfoProduct(product, cartParams));
    return main;
  }
}
