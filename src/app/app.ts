import AppController from './controller/controller';
import MainView from './view/main-view';
import AppView from './view/view';

export type AppConfig = {
  appName: string;
};

export default class App {
  private view: AppView;

  private controller: AppController;

  public constructor(config: AppConfig) {
    this.view = new MainView(config.appName); // Routing should go here, main is start by default
    this.controller = new AppController(); // Some implementation needed here
  }

  public start(): void {}
}
