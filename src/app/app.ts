import AppController from './controller/controller';
import AppView from './view/view';
import './styles/main.scss';
import AppRouter from './router';

export type AppConfig = {
  appName: string;
  description: string;
};

export default class App {
  private view: AppView;

  private controller: AppController;

  private router: AppRouter;

  public constructor(config: AppConfig) {
    this.router = new AppRouter(false);
    this.view = this.router.getView(config.appName, config.description);
    this.controller = new AppController(); // Some implementation needed here
  }

  public start(): void {}
}
