import { Events } from '../../types/dom-types/enums';
import { AppLink } from './router-types';

export default class AppRouter {
  private routeCallbacks: Map<AppLink, (resource?: string) => void>;

  private appName: string;

  public constructor(
    routeCallbacks: Map<AppLink, (resource?: string) => void>,
    isAuthorized: boolean,
    appName: string
  ) {
    this.routeCallbacks = routeCallbacks;
    this.appName = appName;

    document.addEventListener(Events.ContentLoaded, () => {
      this.navigate('');
    });

    window.addEventListener(Events.Popstate, (event) => {
      const params = (event as PopStateEvent).state;
      this.navigate(params);
    });
  }

  public navigate(url: PopStateEvent | string): void {
    if (typeof url === 'string') window.history.pushState(null, '', url);
    const urlParams = window.location.pathname.split('/').slice(1);

    const path = urlParams[0] ? (urlParams[0] as AppLink) : AppLink.Main;
    if (Object.values(AppLink).includes(path)) {
      const resource = urlParams[1];
      this.routeCallbacks.get(path)?.(resource);

      const pageEntry = Object.entries(AppLink).find((entry) => entry[1] === path) || [''];
      document.title = `${this.appName} | ${pageEntry[0]}`;
    } else {
      this.routeCallbacks.get(AppLink.NotFound)?.();
      document.title = `${this.appName} | Not Found`;
    }
  }
}
