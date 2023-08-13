import App, { AppConfig } from '../app/app';
// Some other app data here?
import config from './app-config.json';

const app = new App(config as AppConfig);
app.start();
