import AppController from './controller/controller';
import AppRouter from './router/router';
import { AppLink } from './router/router-types';
import NotFoundView from './view/not-found/not-found-view';
import ProfileView from './view/profile-view';
import AppView from './view/view';
import './styles/main.scss';

export type AppConfig = {
  appName: string;
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

  public start(): void {}

  private setupRouter(): AppRouter {
    const routes = new Map<AppLink, (resource?: string) => void>();
    routes.set(AppLink.Main, () => {
      this.view?.clear();
      this.view = new NotFoundView(this.router);
    });
    routes.set(AppLink.Profile, () => {
      this.view?.clear();
      this.view = new ProfileView(this.router);
    });

    const router = new AppRouter(routes, this.controller.isAuthorized, this.config.appName);
    return router;
  }
}
