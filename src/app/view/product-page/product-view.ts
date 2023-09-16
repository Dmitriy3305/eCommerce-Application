import { Product } from '@commercetools/platform-sdk';
import DOMComponent from '../../../components/base-component';
import InfoProduct from './info-product';
import BreadcrumbedView from '../breadcrumbed-view';

export default class ProductView extends BreadcrumbedView {
  private main?: DOMComponent<HTMLElement>;

  public set product(value: Product) {
    const productInfo = new InfoProduct(value);
    ProductView.MAIN?.append(productInfo);
  }
}
