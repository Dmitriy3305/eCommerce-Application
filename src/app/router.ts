import MainView from './view/main-view';
import AppView from './view/view';

type RouterLink = {
  description: string;
  url: string;
};

export default class AppRouter {
  private static LINKS = {
    Login: 'login',
    Register: 'register',
    Cart: 'cart',
    Profile: 'profile',
  };

  private isAuthorized: boolean;

  private url: string;

  public constructor(isAuthorized: boolean) {
    this.isAuthorized = isAuthorized;
    this.url = window.location.href;
  }

  public set authorized(value: boolean) {
    this.isAuthorized = value;
  }

  public get navigationLinks(): RouterLink[] {
    const links: RouterLink[] = Object.entries(AppRouter.LINKS).map((pair) => {
      return { description: pair[0], url: `/${pair[1]}` };
    });
    return this.isAuthorized
      ? links.filter((link) => link.description === 'Profile' || link.description === 'Cart')
      : links.filter((link) => link.description !== 'Profile');
  }

  public getView(appName: string, appDescription: string): AppView {
    const page = this.url.split('/').at(-1);
    switch (page) {
      case '':
        return new MainView(appName, appDescription);
      default:
        throw Error('View not supported');
    }
  }
}
