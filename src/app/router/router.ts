import { AppLink, RouterLink } from './router-types';

export default class AppRouter {
  private routeCallbacks: Map<AppLink, (resource?: string) => void>;

  private isAuthorized: boolean;

  private appName: string;

  public constructor(
    routeCallbacks: Map<AppLink, (resource?: string) => void>,
    isAuthorized: boolean,
    appName: string
  ) {
    this.isAuthorized = isAuthorized;
    this.routeCallbacks = routeCallbacks;
    this.appName = appName;

    document.addEventListener('DOMContentLoaded', () => {
      this.navigate('');
    });

    window.addEventListener('popstate', (event) => {
      const params = (event as PopStateEvent).state;
      this.navigate(params);
    });
  }

  public set authorized(value: boolean) {
    this.isAuthorized = value;
  }

  public get navigationLinks(): RouterLink[] {
    const links: RouterLink[] = Object.entries(AppLink).map((pair) => {
      return { description: pair[0], url: `/${pair[1]}` };
    });
    return this.isAuthorized
      ? links.filter((link) => link.description === 'Profile' || link.description === 'Cart')
      : links.filter(
          (link) => link.description !== 'Profile' && link.description !== 'NotFound' && link.description !== 'Main'
        );
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
