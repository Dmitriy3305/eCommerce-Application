import AppController from './controller/controller';
import AppRouter from './router/router';
import { AppLink, RouteHandler } from './router/router-types';
import AppView from './view/view';
import HomeView from './view/home-view/home-view';
import NotFoundView from './view/not-found/not-found-view';
import LoginView from './view/login/login-view';
import { Events } from '../types/dom-types/enums';
import { FormSubmitCallback } from '../components/form/form-component';
import { AppInfo, AuthorizationParameters, FormParameters } from '../types/app-parameters';
import ProfileView from './view/profile/profile-view';
import CatalogView from './view/catalog/catalog';
import RegistrationView from './view/registration/registration-view';
import ProductView from './view/product-page/product-view';

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

  private get appInfo(): AppInfo {
    return {
      name: this.config.appName,
      description: this.config.description,
    };
  }

  private get authorizationParameters(): AuthorizationParameters {
    return {
      isAuthorized: this.controller.isAuthorized,
      logoutCallback: () => {
        this.controller.logout();
        this.view?.switchNavigationLinks();
        this.view?.showMessage('Successfully logged out');
      },
    };
  }

  private async getFormViewParameters(
    link: AppLink.Login | AppLink.Register | AppLink.Profile
  ): Promise<FormParameters> {
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

    let countries: string[] | undefined;

    if (link === AppLink.Register || link === AppLink.Profile) {
      countries = await this.controller.loadCountries();
    }

    return {
      validationCallbacks: this.controller.getValidationCallbacks(),
      submitCallback: authCallback,
      countries,
    };
  }

  private setupRouter(): AppRouter {
    const router = new AppRouter(this.getDefaultRouteHandler(), this.config.appName);
    return router;
  }

  private getDefaultRouteHandler(): RouteHandler {
    let accessFormsWhenAuthorized = false;
    return async (link: AppLink, resources?: string[], queries?: URLSearchParams) => {
      const categories = await this.controller.loadCategories();
      this.view?.clear();
      switch (link) {
        case AppLink.Main:
          this.view = new HomeView(this.router, this.appInfo, categories, this.authorizationParameters);
          if (accessFormsWhenAuthorized) {
            accessFormsWhenAuthorized = false;
            this.view.showMessage('You are already authorized. Sign out to access your page');
          }
          break;
        case AppLink.Login: {
          const formParams = await this.getFormViewParameters(link);
          try {
            this.view = new LoginView(this.router, this.appInfo, categories, this.authorizationParameters, formParams);
          } catch {
            accessFormsWhenAuthorized = true;
            this.router.navigate(AppLink.Main);
          }
          break;
        }
        case AppLink.Register: {
          const formParams = await this.getFormViewParameters(link);
          try {
            this.view = new RegistrationView(
              this.router,
              this.appInfo,
              categories,
              this.authorizationParameters,
              formParams
            );
          } catch {
            accessFormsWhenAuthorized = true;
            this.router.navigate(AppLink.Main);
          }
          break;
        }
        case AppLink.Catalog:
          if (!resources) {
            this.view = new CatalogView(
              this.router,
              this.appInfo,
              categories,
              this.authorizationParameters,
              this.controller.getProductsLoader(queries)
            );
          } else {
            const productKey = resources[0].replaceAll('-', ' ');
            this.controller
              .loadProduct(productKey)
              .then((product) => {
                this.view = new ProductView(this.router, this.appInfo, categories, this.authorizationParameters);
                (this.view as ProductView).product = product;
              })
              .catch(() => {
                this.view = new NotFoundView(this.router, this.appInfo, categories, this.authorizationParameters);
              });
          }
          break;
        case AppLink.Profile: {
          this.controller.user?.then(async (user) => {
            const formParams = await this.getFormViewParameters(AppLink.Profile);
            this.view = new ProfileView(
              this.router,
              this.appInfo,
              categories,
              this.authorizationParameters,
              formParams,
              user
            );
          });
          break;
        }
        case AppLink.AboutUs:
        case AppLink.Cart:
        default:
          this.view = new NotFoundView(this.router, this.appInfo, categories, this.authorizationParameters);
          break;
      }
      this.view?.switchActiveLink(link, queries);
    };
  }
}
