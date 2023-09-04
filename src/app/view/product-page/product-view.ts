import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import InfoProduct from './info-product';

export default class ProductView extends AppView {
  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    const infoProduct = new InfoProduct();
    main.append(infoProduct);
    return main;
  }
}
