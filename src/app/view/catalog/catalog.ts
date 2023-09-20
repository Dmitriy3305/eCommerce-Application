import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { AppInfo, AuthorizationParameters, CartParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import { Tags } from '../../../types/dom-types/enums';
import ProductCard from '../product-card';
import throttle from '../../../utils/throttle';
import SearchBar from '../../../components/inputs/searchbar';
import { ProductLoader } from '../../../types/product-loads';
import ProductFiltersMenu from './filters-menu';
import SortMenu from './sorts-menu';
import BreadcrumbedView from '../breadcrumbed-view';

enum CatalogCssClasses {
  ProductsWrapper = 'catalog__products-wrapper',
  Searchbar = 'catalog__searchbar',
  NoResultsLabel = 'catalog__no-results',
}

export default class CatalogView extends BreadcrumbedView {
  private static PRODUCTS_WRAPPER_PARAMS: ElementParameters = {
    classList: [CatalogCssClasses.ProductsWrapper],
  };

  private productLoader: ProductLoader;

  private cartParameters: CartParameters;

  private productsWrapper?: DOMComponent<HTMLElement>;

  private searchbar?: SearchBar;

  private filterMenu?: ProductFiltersMenu;

  private sortMenu?: SortMenu;

  private noResultsLabel: DOMComponent<HTMLSpanElement>;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    loader: ProductLoader,
    cartParameters: CartParameters
  ) {
    super(router, appInfo, categories, authParams);
    this.productLoader = loader;
    this.cartParameters = cartParameters;

    this.addProducts(false);

    this.noResultsLabel = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [CatalogCssClasses.NoResultsLabel],
      textContent: 'No results avaliable',
    });

    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  protected override createMain(): DOMComponent<HTMLElement> {
    const main = super.createMain();

    const searchHandler = () => {
      this.productLoader.resetOffset();
      this.addProducts(true);
    };
    this.searchbar = new SearchBar(searchHandler);
    this.searchbar.addClass(CatalogCssClasses.Searchbar);

    this.filterMenu = new ProductFiltersMenu(searchHandler);
    this.sortMenu = new SortMenu(searchHandler);
    main.append(this.searchbar, this.filterMenu, this.sortMenu);

    const positionHandler = () => {
      this.filterMenu?.setCSSProperty('top', `${this.searchbar?.pageY}px`);
      this.sortMenu?.setCSSProperty('top', `${this.searchbar?.pageY}px`);
      if (this.searchbar) {
        this.filterMenu?.setCSSProperty('left', `${this.searchbar.pageX - 50}px`);
        this.sortMenu?.setCSSProperty('left', `${this.searchbar.pageX + this.searchbar.width}px`);
      }
    };
    window.addEventListener('resize', positionHandler);
    setTimeout(positionHandler);

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
        this.addProducts(false);
      }
    }, 500);
  }

  private async addProducts(withClear: boolean): Promise<void> {
    const queries = this.filterMenu?.data || {};
    queries.searchName = this.searchbar?.value || undefined;

    const sortQueries = this.sortMenu?.data;
    queries.sortBy = sortQueries?.criteria === 'Name' ? 'name.en-US' : sortQueries?.criteria.toLowerCase();
    queries.sortOrder = sortQueries?.isDescending ? 'desc' : 'asc';

    const products = await this.productLoader.load(queries);
    if (withClear) this.productsWrapper?.clear();
    if (products.length) {
      this.noResultsLabel.remove();
      this.productsWrapper?.append(
        ...products.map((product) => new ProductCard(this.router, product, this.cartParameters))
      );
    } else if (withClear) {
      this.productsWrapper?.append(this.noResultsLabel);
    }
  }
}
