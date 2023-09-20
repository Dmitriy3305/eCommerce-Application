import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import RoutedLink from '../../../components/routed-link';
import { AppLink } from '../../router/router-types';
import AppView from '../view';

enum BasketCssClasses {
  Basket = 'basket',
  EmptyBasket = 'basket__empty',
  TitleBasket = 'basket__title',
  ButtonCatalog = 'basket__button_catalog',
}
class BasketEmpty extends AppView {
  private static BASKET_PARAMS: ElementParameters = {
    tag: Tags.Main,
  };

  protected override createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>(BasketEmpty.BASKET_PARAMS);
    const basketEmpty = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketCssClasses.EmptyBasket],
    });
    const titleBasket = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading1,
      classList: [BasketCssClasses.TitleBasket],
      textContent: 'Your cart is empty',
    });
    const buttonCatalog = new RoutedLink(
      {
        classList: [BasketCssClasses.ButtonCatalog],
        textContent: 'Continue shopping',
        attributes: {
          type: 'button',
        },
      },
      AppLink.Catalog,
      this.router
    );

    main.append(basketEmpty);
    basketEmpty.append(titleBasket, buttonCatalog);
    return main;
  }
}

export default BasketEmpty;
