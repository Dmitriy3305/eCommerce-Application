import DOMComponent from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';
import AppRouter from '../router/router';
import AppView from './view';

export default class MainView extends AppView {
  public constructor(router: AppRouter) {
    super(router);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    return main;
  }
}
