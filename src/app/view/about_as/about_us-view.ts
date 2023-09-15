import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import Title from './title';
import Cards from './cards';

export default class AboutUsView extends AppView {
  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    const title = new Title();
    const cards = new Cards();
    main.append(title, cards);
    return main;
  }
}
