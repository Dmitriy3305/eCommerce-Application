import { ProductProjection } from '@commercetools/platform-sdk';
import DOMComponent, { ElementParameters } from '../../components/base-component';
import QuantityInput from '../../components/inputs/quantity-input';
import { CartParameters } from '../../types/app-parameters';
import { CartProduct } from '../../types/cart-product';
import { Events, Tags } from '../../types/dom-types/enums';
import getLinkIcon from '../../utils/get-link-icon';

enum AddToCartButtonCssClasses {
  Button = 'add-to-cart-button',
  QuantityRegulation = 'add-to-cart-button__quantity-regulation',
}

export default class AddToCartButton extends DOMComponent<HTMLElement> {
  private static BUTTON_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [AddToCartButtonCssClasses.Button],
    textContent: 'Add to cart',
  };

  private quantityInput: QuantityInput;

  private cartParameters: CartParameters;

  private product: ProductProjection;

  public constructor(productData: ProductProjection | CartProduct, cartParameters: CartParameters) {
    super(AddToCartButton.BUTTON_PARAMS);
    this.append(getLinkIcon('Catalog'));

    const isCartProduct = Object.prototype.hasOwnProperty.call(productData, 'quantity');

    this.product = isCartProduct ? (productData as CartProduct).product : (productData as ProductProjection);
    this.cartParameters = cartParameters;

    this.addEventListener(Events.Click, (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      cartParameters.productAdder(this.product.masterVariant).then(() => {
        this.replaceWith(this.quantityInput);
      });
    });

    this.quantityInput = new QuantityInput(
      (quantity) => {
        const id = isCartProduct ? (productData as CartProduct).product.id : (productData as ProductProjection).id;
        if (quantity) cartParameters.productUpdater(id, quantity);
        else {
          cartParameters.productDeleter(id);
          this.quantityInput.replaceWith(this);
        }
      },
      isCartProduct ? (productData as CartProduct).quantity : 1
    );
    this.quantityInput.addEventListener(Events.Click, (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    this.quantityInput.addClass(AddToCartButtonCssClasses.QuantityRegulation);
  }

  public checkCartPresence(): void {
    this.cartParameters.includeChecker(this.product.id).then((isInCart) => {
      if (isInCart) this.replaceWith(this.quantityInput);
    });
  }
}
