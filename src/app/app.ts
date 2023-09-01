import AppController from './controller/controller';
import AppRouter from './router/router';
import { AppLink, RouteHandler } from './router/router-types';
import AppView from './view/view';
import HomeView from './view/home-view/home-view';
import NotFoundView from './view/not-found/not-found-view';
import LoginView from './view/login/login-view';
import RegistrationView from './view/registration/registration-view';
import { Events } from '../types/dom-types/enums';
import './styles/main.scss';
import { FormSubmitCallback } from '../components/form/form-component';

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
    this.controller = new AppController();
    this.router = this.setupRouter();
  }

  public start(): void {
    try {
      this.controller.authorizeSavedUser();
    } catch (error) {
      setTimeout(() => {
        this.view?.showError((error as Error).message);
      }, 50);
    }
    document.addEventListener(Events.ContentLoaded, () => {
      this.router.navigate('');
    });
  }

  private setupRouter(): AppRouter {
    const routes = new Map<AppLink, RouteHandler>();
    Object.values(AppLink).forEach((link) => routes.set(link, this.getDefaultRouteHandler(link)));
    const router = new AppRouter(routes, this.config.appName);
    return router;
  }

  private getDefaultRouteHandler(link: AppLink): RouteHandler {
    const validationCallbacks = this.controller.getValidationCallbacks();
    const authCallback: FormSubmitCallback = async (data) => {
      try {
        if (link === AppLink.Login) await this.controller.authorize(data);
        else await this.controller.register(data);
        this.router.navigate(AppLink.Main);
        this.view?.showMessage(link === AppLink.Login ? 'Successfully logged in' : 'Successfully signed up');
        this.view?.switchNavigationLinks();
      } catch (error) {
        this.view?.showError((error as Error).message);
      }
    };
    const logoutCallback = () => {
      this.controller.logout();
      this.view?.switchNavigationLinks();
      this.view?.showMessage('Successfully logged out');
    };
    return async (resource?: string, queries?: URLSearchParams) => {
      this.controller.loadCategories((categories) => {
        this.view?.clear();
        switch (link) {
          case AppLink.Main:
            this.view = new HomeView(
              this.router,
              this.config.appName,
              this.config.description,
              categories,
              this.controller.isAuthorized,
              logoutCallback
            );
            break;
          case AppLink.Login:
            this.view = new LoginView(
              this.router,
              this.config.appName,
              this.config.description,
              categories,
              this.controller.isAuthorized,
              logoutCallback,
              validationCallbacks,
              authCallback
            );
            break;
          case AppLink.Register:
            this.controller.loadCountries().then((countries) => {
              this.view = new RegistrationView(
                this.router,
                this.config.appName,
                this.config.description,
                categories,
                this.controller.isAuthorized,
                logoutCallback,
                validationCallbacks,
                countries,
                authCallback
              );
              this.view.switchActiveLink(link, queries);
            });
            break;
          case AppLink.Cart:
          case AppLink.AboutUs:
          case AppLink.Catalog:
          default:
            this.view = new NotFoundView(
              this.router,
              this.config.appName,
              this.config.description,
              categories,
              this.controller.isAuthorized,
              logoutCallback
            );
            break;
        }
        this.view?.switchActiveLink(link, queries);
      });
    };
  }
}
