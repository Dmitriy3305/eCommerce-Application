import DOMComponent from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';
import AppView from './view';

export default class MainView extends AppView {
  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    return main;
  }
}
