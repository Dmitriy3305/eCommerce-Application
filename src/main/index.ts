import App, { AppConfig } from '../app/app';
import config from './app-config.json';

const app = new App(config as AppConfig);
app.start();
