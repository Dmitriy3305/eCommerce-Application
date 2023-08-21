import AppController from './controller/controller';
import AppRouter from './router/router';
import { AppLink, RouteHandler } from './router/router-types';
import HomeView from './view/home-view/home-view';
import NotFoundView from './view/not-found/not-found-view';
import AppView from './view/view';
import { Events } from '../types/dom-types/enums';
import './styles/main.scss';

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
    const routes = new Map<AppLink, RouteHandler>();
    Object.values(AppLink).forEach((link) => routes.set(link, this.getDefaultRouteHandler(link)));
    const router = new AppRouter(routes, this.controller.isAuthorized, this.config.appName);
    return router;
  }

  private getDefaultRouteHandler(link: AppLink): RouteHandler {
    return async (resource?: string, queries?: URLSearchParams) => {
      this.controller.loadCategories((categories) => {
        this.view?.clear();
        switch (link) {
          case AppLink.Main:
            this.view = new HomeView(this.router, this.config.appName, this.config.description, categories);
            break;
          case AppLink.AboutUs:
          case AppLink.Catalog:
          case AppLink.Login:
          case AppLink.Register:
          case AppLink.Cart:
            this.view = new NotFoundView(this.router, this.config.appName, this.config.description, categories);
            break;
          default:
            break;
        }
        this.view?.switchActiveLink(link, queries);
      });
    };
  }
}
