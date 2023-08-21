import DOMComponent from '../../components/base-component';
import { Tags } from '../../types/dom-types/enums';
import AppView from './view';

export default class ProfileView extends AppView {
  protected override createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    return main;
  }
}
