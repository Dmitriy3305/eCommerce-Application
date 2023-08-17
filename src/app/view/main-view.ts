import DOMComponent from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';
import AppView from './view';

export default class MainView extends AppView {
  public constructor() {
    super();
  }

  protected createMain(): DOMComponent<HTMLElement> {
    return new DOMComponent<HTMLElement>({
      tag: Tags.Main,
      textContent: 'This is main view',
    });
  }
}
