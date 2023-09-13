import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppRouter from '../../router/router';
import RoutedLink from '../../../components/routed-link';
import { AppLink } from '../../router/router-types';

enum BasketCssClasses {
  Basket = 'basket',
  EmptyBasket = 'empty__basket',
  TitleBasket = 'title__basket',
  ButtonCatalog = 'button__catalog',
}
class BasketEmpty extends DOMComponent<HTMLElement> {
  private static BASKET_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [BasketCssClasses.Basket],
  };

  private basketEmpty: DOMComponent<HTMLDivElement>;

  public constructor(router: AppRouter) {
    super(BasketEmpty.BASKET_PARAMS);
    this.basketEmpty = new DOMComponent<HTMLDivElement>({
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
      router
    );

    this.append(this.basketEmpty);
    this.basketEmpty.append(titleBasket, buttonCatalog);
  }
}

export default BasketEmpty;
