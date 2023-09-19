import { ProductProjection, ProductVariant } from '@commercetools/platform-sdk';
import { Events } from '../../types/dom-types/enums';
import { getEnumKey, isEnumValue } from '../../utils/enum-utils';
import { AppLink, LinkQueries, RouteHandler } from './router-types';
import toKebabCase from '../../utils/to-kebab-case';

export default class AppRouter {
  private routeCallback: RouteHandler;

  private appName: string;

  public constructor(routeCallback: RouteHandler, appName: string) {
    this.routeCallback = routeCallback;
    this.appName = appName;

    window.addEventListener(Events.Popstate, (event) => {
      const params = (event as PopStateEvent).state;
      this.navigate(params);
    });
  }

  public get currentLink(): AppLink {
    const urlParams = window.location.pathname.split('/').slice(1);
    return urlParams[0] ? (urlParams[0] as AppLink) : AppLink.Main;
  }

  public navigate(url: PopStateEvent | string): void {
    if (typeof url === 'string') window.history.pushState({ prevUrl: window.location.href }, '', url);
    const urlParams = window.location.pathname.split('/').slice(1);
    const queries = new URL(window.location.href).searchParams;

    const path = urlParams[0] ? (urlParams[0] as AppLink) : AppLink.Main;
    if (isEnumValue(AppLink, path)) {
      const resources = urlParams.length > 1 ? urlParams.slice(1) : undefined;
      this.routeCallback(path, resources, queries);

      let pageName = getEnumKey(AppLink, path);
      pageName = pageName === 'AboutUs' ? 'About Us' : pageName;
      document.title = `${this.appName} | ${pageName}`;
    } else {
      this.routeCallback(AppLink.NotFound);
      document.title = `${this.appName} | Not Found`;
    }
  }

  public buildCategoryUrl(category: string): string {
    return `${AppLink.Catalog}?${LinkQueries.CategoryFilter}=${category.toLowerCase()}`;
  }

  public buildProductUrl(product: ProductProjection, variant?: ProductVariant): string {
    if (!product.key) return '';
    if (variant && variant.key) {
      const [productName, variantName] = product.key.split('-');
      return `${AppLink.Catalog}/${toKebabCase(productName.trim())}/${toKebabCase(variantName.trim())}`;
    }
    return `${AppLink.Catalog}/${toKebabCase(product.key)}`;
  }

  public getAbsoluteLink(link: string): string {
    return `${window.location.origin}/${link}`;
  }

  public get locationHistory(): string[] {
    const queries = new URL(window.location.href).searchParams;

    const parts = [AppLink.Main, ...window.location.pathname.split('/')];
    if (window.location.href.includes('products/') && !window.location.href.endsWith('products/')) {
      const { prevUrl } = window.history.state;
      const prevCategory = new URL(prevUrl).searchParams;

      const lastPart = parts.pop();
      parts.push(prevCategory.get('category') || '', lastPart || '');
    } else {
      parts.push(queries.get('category') || '');
    }
    return parts.filter((link) => link);
  }
}
