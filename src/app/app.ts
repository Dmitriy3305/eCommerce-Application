import AppController from './controller/controller';
import MainView from './view/main-view';
import AppView from './view/view';
import './styles/main.scss';

export type AppConfig = {
  appName: string;
  description: string;
};

export default class App {
  private view: AppView;

  private controller: AppController;

  public constructor(config: AppConfig) {
    this.view = new MainView(config.appName, config.description); // Routing should go here, main is start by default
    this.controller = new AppController(); // Some implementation needed here
  }

  public start(): void {}
}
