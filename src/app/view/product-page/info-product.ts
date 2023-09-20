import { ProductProjection } from '@commercetools/platform-sdk';
import DOMComponent from '../../../components/base-component';
import Slider from './slider-product';
import { Tags } from '../../../types/dom-types/enums';
import { CartParameters } from '../../../types/app-parameters';
import AddToCartButton from '../add-to-cart-btn';
import { CartProduct } from '../../../types/cart-product';

enum InfoCssClasses {
  InfoProduct = 'info__product',
  NameProduct = 'name-info__product',
  MainInfoProduct = 'main-info-product',
  PriceProduct = 'price-container__product',
  ContainerOldPrice = 'old-price__product',
  PriceNotDiscount = 'price__product',
  DiscountValue = 'discount-value_product',
  DiscountProduct = 'discount__product',
  SizesContainer = 'sizes-container__product',
  SizeProduct = 'size-product',
  BtnAddCart = 'btn-add-cart__product',
  DescriptionProduct = 'description__product',
  attribute = 'attribute',
  ContainerForAttributes = 'container-attributes',
  AttributeProduct = 'attribute-product',
}
class InfoProduct extends Slider {
  private nameProduct: DOMComponent<HTMLHeadingElement>;

  private containerOldPrice: DOMComponent<HTMLDivElement>;

  private priceProduct: DOMComponent<HTMLSpanElement>;

  private discountValue: DOMComponent<HTMLSpanElement>;

  private discountProduct: DOMComponent<HTMLParagraphElement>;

  private descriptionProduct: DOMComponent<HTMLDivElement>;

  private containerAttributes: DOMComponent<HTMLElement>;

  private btnAddCart: AddToCartButton;

  public constructor(productData: ProductProjection | CartProduct, cartParameters: CartParameters) {
    super(productData);
    const infoProduct = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [InfoCssClasses.InfoProduct],
    });
    this.nameProduct = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading1,
      classList: [InfoCssClasses.NameProduct],
    });
    const mainInfoProduct = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [InfoCssClasses.MainInfoProduct],
    });

    const priceContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [InfoCssClasses.PriceProduct],
    });
    this.discountProduct = new DOMComponent<HTMLParagraphElement>({
      tag: Tags.Paragraph,
      classList: [InfoCssClasses.DiscountProduct],
    });
    this.containerOldPrice = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [InfoCssClasses.ContainerOldPrice],
    });
    this.priceProduct = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [InfoCssClasses.PriceNotDiscount],
    });
    this.discountValue = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [InfoCssClasses.DiscountValue],
    });
    const attribute = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [InfoCssClasses.attribute],
    });
    this.containerAttributes = new DOMComponent<HTMLDivElement>({
      tag: Tags.UnorderedList,
      classList: [InfoCssClasses.ContainerForAttributes],
      textContent: 'product attributes',
    });
    this.btnAddCart = new AddToCartButton(productData, cartParameters);
    this.descriptionProduct = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [InfoCssClasses.DescriptionProduct],
    });
    this.append(infoProduct);
    priceContainer.append(this.containerOldPrice, this.discountProduct);
    this.containerOldPrice.append(this.priceProduct, this.discountValue);
    infoProduct.append(mainInfoProduct, this.descriptionProduct);
    mainInfoProduct.append(this.nameProduct, priceContainer, attribute, this.containerAttributes, this.btnAddCart);
    this.btnAddCart.checkCartPresence();
    attribute.append(this.containerAttributes);

    const isCartProduct = Object.prototype.hasOwnProperty.call(productData, 'quantity');
    const product = isCartProduct ? (productData as CartProduct).product : (productData as ProductProjection);
    this.addInfoProduct(product);
  }

  public addInfoProduct(product: ProductProjection): void {
    const { name } = product;
    this.nameProduct.addText(`${name['en-US']}`);
    const { prices } = product.masterVariant;
    const discountNo = prices ? prices[0].discounted : '';
    const priseValue = prices ? prices[0].value.centAmount : '';
    if (discountNo === undefined) {
      this.priceProduct.addText(`$${+priseValue * 0.01}`);
      this.discountProduct.addClass('hidden');
      this.discountValue.removeClass('discount-value_product');
      this.discountValue.addClass('hidden');
    } else {
      const discountValue = discountNo ? discountNo.value.centAmount : '';
      this.priceProduct.addText(` $${Math.round(+priseValue * 0.01).toFixed(2)}`);
      this.priceProduct.addClass('price-not-discount');
      this.discountProduct.addText(`$${Math.round(+discountValue * 0.01).toFixed(2)}`);
      this.discountProduct.addClass('discount');
      this.discountValue.addText(`- ${100 - (+discountValue * 100) / +priseValue}%`);
    }

    const desc = product.description;
    let descProduct;
    if (desc === undefined) {
      descProduct = '';
    } else {
      descProduct = Object.values(desc);
    }
    const descriptionMod = `${descProduct[0]}`.replaceAll(`&#x27;`, `'`);
    this.descriptionProduct.addText(descriptionMod);

    const { attributes } = product.masterVariant;
    if (attributes) {
      for (let i = 0; i < attributes.length; i += 1) {
        const attribute = new DOMComponent<HTMLLIElement>({
          tag: Tags.ListElement,
          classList: [InfoCssClasses.AttributeProduct],
        });
        const contentAttribute = attributes[i].name;
        const attributeMod = contentAttribute.replaceAll(`-`, ` `);
        const words = attributeMod
          .split(' ')
          .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
          .join(' ');
        attribute.addText(`${words}`);
        this.containerAttributes.append(attribute);
      }
    }
  }
}

export default InfoProduct;
