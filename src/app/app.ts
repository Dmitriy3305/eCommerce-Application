import AppController from './controller/controller';
// import MainView from './view/main-view';
import AppView from './view/view';
import HomePageView from './view/home-view';
import './styles/main.scss';
// import Season from './view/home-page/home-page';

export type AppConfig = {
  appName: string;
};

export default class App {
  private view: AppView;

  private controller: AppController;

  public constructor(config: AppConfig) {
    // this.view = new MainView(config.appName);
    this.view = new HomePageView(config.appName); // Routing should go here, main is start by default
    // this.view = new Season();
    this.controller = new AppController(); // Some implementation needed here
  }

  public start(): void {}
}
