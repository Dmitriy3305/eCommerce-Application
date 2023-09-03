import { ProductProjection } from '@commercetools/platform-sdk';
import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { AppInfo, AuthorizationParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import AppView from '../view';
import { Tags } from '../../../types/dom-types/enums';
import ProductCard from '../product-card';
import throttle from '../../../utils/throttle';
import SearchBar from '../../../components/inputs/searchbar';

enum CatalogCssClasses {
  ProductsWrapper = 'catalog__products-wrapper',
  Searchbar = 'catalog__searchbar',
}

type LoadProductsCallback = () => Promise<ProductProjection[]>;

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

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  protected override createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    const searchBar = new SearchBar(() => {});
    searchBar.addClass(CatalogCssClasses.Searchbar);
    main.append(searchBar);

    this.productsWrapper = new DOMComponent<HTMLElement>({
      ...CatalogView.PRODUCTS_WRAPPER_PARAMS,
      parent: main,
    });
    return main;
  }

  private get scrollHandler(): () => void {
    return throttle(() => {
      const height = document.body.offsetHeight;
      const screenHeight = window.innerHeight;
      const scrolled = window.scrollY;
      const threshold = height - screenHeight / 4;

      const position = scrolled + screenHeight;

      if (position >= threshold) {
        this.addProducts();
      }
    }, 500);
  }

  private async addProducts(): Promise<void> {
    const products = await this.loadCallback();
    this.productsWrapper?.append(...products.map((product) => new ProductCard(this.router, product, true)));
  }
}
