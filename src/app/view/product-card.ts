import { ProductProjection } from '@commercetools/platform-sdk';
import DOMComponent, { ElementParameters } from '../../components/base-component';
import RoutedLink from '../../components/routed-link';
import AppRouter from '../router/router';
import { Events, Tags } from '../../types/dom-types/enums';
import getLinkIcon from '../../utils/get-link-icon';
import { CartParameters } from '../../types/app-parameters';
import QuantityInput from '../../components/inputs/quantity-input';
import { CartProduct } from '../../types/cart-product';

enum ProductCardCssClasses {
  Link = 'product-card',
  CardFull = 'product-card_full',
  ImageWrapper = 'product-card__image-wrapper',
  Image = 'product-card__image',
  Name = 'product-card__name',
  Description = 'product-card__description',
  PricesWrapper = 'product__prices',
  Price = 'product-card__price',
  Discount = 'product-card__discount',
  AddToCart = 'product-card__add-to-cart',
  CartRegulation = 'product-card__cart-regulation',
}

export default class ProductCard extends RoutedLink {
  private static CARD_PARAMETERS: ElementParameters = {
    classList: [ProductCardCssClasses.Link],
  };

  private static IMAGE_WRAPPER_PARAMS: ElementParameters = {
    classList: [ProductCardCssClasses.ImageWrapper],
  };

  private static IMAGE_PARAMETERS: ElementParameters = {
    tag: Tags.Image,
    classList: [ProductCardCssClasses.Image],
  };

  private static NAME_PARAMETERS: ElementParameters = {
    tag: Tags.Span,
    classList: [ProductCardCssClasses.Name],
  };

  private static DESCRIPTION_PARAMETERS: ElementParameters = {
    tag: Tags.Span,
    classList: [ProductCardCssClasses.Description],
  };

  private static DESCRIPTION_CHARS_LIMTIT = 100;

  private static PRICE_WRAPPER_PARAMS: ElementParameters = {
    classList: [ProductCardCssClasses.PricesWrapper],
  };

  private static PRICE_PARAMETERS: ElementParameters = {
    tag: Tags.Span,
    classList: [ProductCardCssClasses.Price],
  };

  private static DISCOUNT_PARAMETERS: ElementParameters = {
    tag: Tags.Span,
    classList: [ProductCardCssClasses.Discount],
  };

  private static CARD_BUTTON_PARAMETERS: ElementParameters = {
    tag: Tags.Button,
    classList: [ProductCardCssClasses.AddToCart],
    textContent: 'Add to cart',
  };

  private imageWrapper: DOMComponent<HTMLDivElement>;

  private image: DOMComponent<HTMLImageElement>;

  private name: DOMComponent<HTMLSpanElement>;

  private description?: DOMComponent<HTMLSpanElement>;

  private priceWrapper?: DOMComponent<HTMLDivElement>;

  private price?: DOMComponent<HTMLSpanElement>;

  private discount?: DOMComponent<HTMLSpanElement>;

  private addToCartButton?: DOMComponent<HTMLButtonElement>;

  public constructor(router: AppRouter, productData: ProductProjection | CartProduct, cartParameters?: CartParameters) {
    const isCartProduct = Object.prototype.hasOwnProperty.call(productData, 'quantity');
    const product = isCartProduct ? (productData as CartProduct).product : (productData as ProductProjection);
    super(ProductCard.CARD_PARAMETERS, router.buildProductUrl(product), router);

    this.imageWrapper = new DOMComponent<HTMLDivElement>(ProductCard.IMAGE_WRAPPER_PARAMS);
    this.append(this.imageWrapper);

    const variant = product.masterVariant;

    this.image = new DOMComponent<HTMLImageElement>({
      ...ProductCard.IMAGE_PARAMETERS,
      attributes: { src: variant.images ? variant.images[0].url : '', alt: variant.key || 'Shoe' },
    });
    this.imageWrapper.append(this.image);

    this.name = new DOMComponent<HTMLSpanElement>({
      ...ProductCard.NAME_PARAMETERS,
      textContent: product.name['en-US'],
    });
    this.append(this.name);

    if (cartParameters) this.addAdditionals(productData, isCartProduct, cartParameters);
  }

  private addAdditionals(
    productData: ProductProjection | CartProduct,
    isCartProduct: boolean,
    cartParameters: CartParameters
  ) {
    this.addClass(ProductCardCssClasses.CardFull);

    const product = isCartProduct ? (productData as CartProduct).product : (productData as ProductProjection);

    const variant = product.masterVariant;

    const description = product.description
      ? `${product.description['en-US'].substring(0, ProductCard.DESCRIPTION_CHARS_LIMTIT).replace('&#x27;', "'")}...`
      : '';

    this.description = new DOMComponent<HTMLSpanElement>({
      ...ProductCard.DESCRIPTION_PARAMETERS,
      textContent: description,
    });
    this.append(this.description);

    const price = variant.prices ? variant.prices[0] : null;

    if (price) {
      this.price = new DOMComponent({
        ...ProductCard.PRICE_PARAMETERS,
        textContent: `${price.value.centAmount / 100}$`,
      });
      this.append(this.price);
    }

    if (price && price.discounted && this.price) {
      this.priceWrapper = new DOMComponent(ProductCard.PRICE_WRAPPER_PARAMS);
      this.discount = new DOMComponent({
        ...ProductCard.DISCOUNT_PARAMETERS,
        textContent: `${price.discounted.value.centAmount / 100}$`,
      });
      this.append(this.priceWrapper);
      this.priceWrapper.append(this.price, this.discount);
    }

    cartParameters.includeChecker(product.id).then((isInCart) => {
      if (isInCart) this.switchCartButton(cartParameters, isCartProduct, productData);
      else {
        this.addToCartButton = this.createAddToCartButton(cartParameters, isCartProduct, productData);
        this.append(this.addToCartButton);
      }
    });
  }

  private switchCartButton(
    cartParameters: CartParameters,
    isCartProduct: boolean,
    productData: CartProduct | ProductProjection
  ) {
    const regulation = new QuantityInput(
      (quantity) => {
        const id = isCartProduct ? (productData as CartProduct).product.id : (productData as ProductProjection).id;
        console.log('Quantity:', quantity);
        if (quantity) cartParameters.productUpdater(id, quantity);
        else {
          cartParameters.productDeleter(id);
          regulation.remove();
          if (!this.addToCartButton)
            this.addToCartButton = this.createAddToCartButton(cartParameters, isCartProduct, productData);
          this.append(this.addToCartButton);
        }
      },
      isCartProduct ? (productData as CartProduct).quantity : 1
    );
    regulation.addClass(ProductCardCssClasses.CartRegulation);
    regulation.addEventListener(Events.Click, (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
    });
    this.addToCartButton?.remove();
    this.append(regulation);
  }

  private createAddToCartButton(
    cartParameters: CartParameters,
    isCartProduct: boolean,
    productData: ProductProjection | CartProduct
  ): DOMComponent<HTMLButtonElement> {
    const addToCartButton = new DOMComponent<HTMLButtonElement>(ProductCard.CARD_BUTTON_PARAMETERS);
    addToCartButton.append(getLinkIcon('Catalog'));

    const product = isCartProduct ? (productData as CartProduct).product : (productData as ProductProjection);
    addToCartButton.addEventListener(Events.Click, (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      cartParameters.productAdder(product.masterVariant).then(() => {
        this.switchCartButton(cartParameters, isCartProduct, productData);
      });
    });
    return addToCartButton;
  }
}
