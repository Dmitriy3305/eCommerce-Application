import AppController from './controller/controller';
import AppRouter from './router/router';
import { AppLink, RouteHandler } from './router/router-types';
import MainView from './view/main-view';
import AppView from './view/view';
import './styles/main.scss';
import { Events } from '../types/dom-types/enums';

export type AppConfig = {
  appName: string;
  description: string;
};

export default class App {
  private config: AppConfig;

  private view?: AppView;

  private controller: AppController;

  private router: AppRouter;

  public constructor(config: AppConfig) {
    this.config = config;
    this.controller = new AppController(); // Some implementation needed here
    this.router = this.setupRouter();
  }

  public start(): void {
    document.addEventListener(Events.ContentLoaded, () => {
      this.router.navigate('');
    });
  }

  private setupRouter(): AppRouter {
    const routes = new Map<AppLink, (resource?: string) => void>();
    Object.values(AppLink).forEach((link) => routes.set(link, this.getDefaultRouteHandler(link)));
    const router = new AppRouter(routes, this.controller.isAuthorized, this.config.appName);
    return router;
  }

  private getDefaultRouteHandler(link: AppLink): RouteHandler {
    return () => {
      this.view?.clear();
      switch (link) {
        case AppLink.Main:
        case AppLink.AboutUs:
        case AppLink.Catalog:
        case AppLink.Login:
        case AppLink.Register:
        case AppLink.Cart:
          this.view = new MainView(this.router, this.config.appName, this.config.description);
          break;
        default:
          break;
      }
      this.view?.switchActiveLink(link);
    };
  }
}
