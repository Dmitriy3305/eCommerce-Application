import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import Title from './title';

export default class AboutUsView extends AppView {
  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    const title = new Title();
    main.append(title);
    return main;
  }
}
