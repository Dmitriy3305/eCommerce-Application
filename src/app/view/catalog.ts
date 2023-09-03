import { Product } from '@commercetools/platform-sdk';
import DOMComponent, { ElementParameters } from '../../components/base-component';
import { AppInfo, AuthorizationParameters } from '../../types/app-parameters';
import { GrouppedCategories } from '../api/products';
import AppRouter from '../router/router';
import AppView from './view';
import { Tags } from '../../types/dom-types/enums';
import ProductCard from './product-card';

enum CatalogCssClasses {
  ProductsWrapper = 'catalog__products-wrapper',
}

type LoadProductsCallback = () => Promise<Product[]>;

export default class CatalogView extends AppView {
  private static PRODUCTS_WRAPPER_PARAMS: ElementParameters = {
    classList: [CatalogCssClasses.ProductsWrapper],
  };

  private loadCallback: LoadProductsCallback;

  private productsWrapper?: DOMComponent<HTMLElement>;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    loadProductsCallback: LoadProductsCallback
  ) {
    super(router, appInfo, categories, authParams);
    this.loadCallback = loadProductsCallback;
    this.addProducts();
  }

  protected override createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    this.productsWrapper = new DOMComponent<HTMLElement>({ ...CatalogView.PRODUCTS_WRAPPER_PARAMS, parent: main });
    return main;
  }

  private async addProducts(): Promise<void> {
    const products = await this.loadCallback();
    products.forEach((product) => {
      this.productsWrapper?.append(new ProductCard(this.router, product, true));
    });
  }
}
