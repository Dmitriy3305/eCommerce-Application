import { Events } from '../../types/dom-types/enums';
import { getEnumKey, isEnumValue } from '../../utils/enum-utils';
import { AppLink, RouteHandler } from './router-types';

export default class AppRouter {
  private routeCallbacks: Map<AppLink, RouteHandler>;

  private appName: string;

  public constructor(
    routeCallbacks: Map<AppLink, (resource?: string) => void>,
    isAuthorized: boolean,
    appName: string
  ) {
    this.routeCallbacks = routeCallbacks;
    this.appName = appName;

    window.addEventListener(Events.Popstate, (event) => {
      const params = (event as PopStateEvent).state;
      this.navigate(params);
    });
  }

  public navigate(url: PopStateEvent | string): void {
    if (typeof url === 'string') window.history.pushState(null, '', url);
    const urlParams = window.location.pathname.split('/').slice(1);

    const path = urlParams[0] ? (urlParams[0] as AppLink) : AppLink.Main;
    if (isEnumValue(AppLink, path)) {
      const resource = urlParams[1];
      this.routeCallbacks.get(path)?.(resource);

      let pageName = getEnumKey(AppLink, path);
      pageName = pageName === 'AboutUs' ? 'About Us' : pageName;
      document.title = `${this.appName} | ${pageName}`;
    } else {
      this.routeCallbacks.get(AppLink.NotFound)?.();
      document.title = `${this.appName} | Not Found`;
    }
  }
}
