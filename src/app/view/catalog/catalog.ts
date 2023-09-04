import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { AppInfo, AuthorizationParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import AppView from '../view';
import { Tags } from '../../../types/dom-types/enums';
import ProductCard from '../product-card';
import throttle from '../../../utils/throttle';
import SearchBar from '../../../components/inputs/searchbar';
import { ProductFilterQueries, ProductLoader } from '../../../types/product-loads';

enum CatalogCssClasses {
  ProductsWrapper = 'catalog__products-wrapper',
  Searchbar = 'catalog__searchbar',
}

export default class CatalogView extends AppView {
  private static PRODUCTS_WRAPPER_PARAMS: ElementParameters = {
    classList: [CatalogCssClasses.ProductsWrapper],
  };

  private productLoader: ProductLoader;

  private productsWrapper?: DOMComponent<HTMLElement>;

  private searchbar?: SearchBar;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    loader: ProductLoader
  ) {
    super(router, appInfo, categories, authParams);
    this.productLoader = loader;
    this.addProducts();

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  protected override createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    this.searchbar = new SearchBar(() => {
      this.productsWrapper?.clear();
      this.productLoader.resetOffset();
      this.addProducts();
    });
    this.searchbar.addClass(CatalogCssClasses.Searchbar);
    main.append(this.searchbar);

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
    const queries: ProductFilterQueries = {
      searchName: this.searchbar?.value || undefined,
    };
    const products = await this.productLoader.load(queries);
    this.productsWrapper?.append(...products.map((product) => new ProductCard(this.router, product, true)));
  }
}
