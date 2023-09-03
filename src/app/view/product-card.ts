import { ProductProjection } from '@commercetools/platform-sdk';
import DOMComponent, { ElementParameters } from '../../components/base-component';
import RoutedLink from '../../components/routed-link';
import AppRouter from '../router/router';
import { Tags } from '../../types/dom-types/enums';
import getLinkIcon from '../../utils/get-link-icon';

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

  private static DISCROUNT_PARAMETERS: ElementParameters = {
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

  public constructor(router: AppRouter, product: ProductProjection, withAdditionals = false) {
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

    if (withAdditionals) {
      this.addClass(ProductCardCssClasses.CardFull);

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
          ...ProductCard.DISCROUNT_PARAMETERS,
          textContent: `${price.discounted.value.centAmount / 100}$`,
        });
        this.append(this.priceWrapper);
        this.priceWrapper.append(this.price, this.discount);
      }

      this.addToCartButton = new DOMComponent<HTMLButtonElement>(ProductCard.CARD_BUTTON_PARAMETERS);
      this.addToCartButton.append(getLinkIcon('Catalog'));
      this.append(this.addToCartButton);
    }
  }
}
