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
import RegistrationView from './view/Registration/registration-view';
import ProfileView from './view/profile/profile-view';
import UserRepository from './api/user';

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

    const countries: string[] | undefined =
      link === AppLink.Register ? await this.controller.loadCountries() : undefined;

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
    return async (link: AppLink, resource?: string, queries?: URLSearchParams) => {
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
        case AppLink.Cart:
        case AppLink.Profile: {
          const customerData = localStorage.getItem('shoe-corner:auth-token');
          if (customerData) {
            const dataObject = JSON.parse(customerData);
            const { customerId } = dataObject;
            const user = new UserRepository();
            const dataUser = await user.getDataUser(customerId);
            const formParams = await this.getFormViewParameters(AppLink.Profile);
            this.view = new ProfileView(
              this.router,
              this.appInfo,
              categories,
              this.authorizationParameters,
              formParams,
              dataUser
            );
          }
          break;
        }
        case AppLink.AboutUs:
        case AppLink.Catalog:
        default:
          this.view = new NotFoundView(this.router, this.appInfo, categories, this.authorizationParameters);
          break;
      }
      this.view?.switchActiveLink(link, queries);
    };
  }
}
