import { Events } from '../../types/dom-types/enums';
import { getEnumKey, isEnumValue } from '../../utils/enum-utils';
import { AppLink, LinkQueries, RouteHandler } from './router-types';

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

  public navigate(url: PopStateEvent | string): void {
    if (typeof url === 'string') window.history.pushState(null, '', url);
    const urlParams = window.location.pathname.split('/').slice(1);
    const queries = new URL(window.location.href).searchParams;

    const path = urlParams[0] ? (urlParams[0] as AppLink) : AppLink.Main;
    if (isEnumValue(AppLink, path)) {
      const resource = urlParams[1];
      this.routeCallback(path, resource, queries);

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
}
