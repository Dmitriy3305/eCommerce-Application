import { ProductProjection } from '@commercetools/platform-sdk';
import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import InputDomComponent from '../../../components/inputs/input-component';
import DeleteIcon from '../../../assets/images/basket/delete-icon.svg';
import { CartProduct } from '../../../types/cart-product';
import { CartParameters } from '../../../types/app-parameters';

enum BasketItemCssClasses {
  ItemBasket = 'basket__item',
  ItemBasketImg = 'basket__item_img',
  ImgProductBasket = 'basket__img_product',
  ItemBasketDetails = 'basket__item_details',
  ItemBasketName = 'basket__item_name',
  ItemBasketQuantity = 'basket__item_quantity',
  BlokQuantity = 'basket__quantity',
  QuantityProduct = 'basket__quantity_product',
  PlusProduct = 'basket__plus_product',
  SumProduct = 'basket__sum_product',
  MinusProduct = 'basket__minus_product',
  ItemBasketPrice = 'basket__item_price',
  PriceProduct = 'basket__price_product',
  DeleteProduct = 'basket__delete_product',
}

export default class BasketItem extends DOMComponent<HTMLElement> {
  private static ITEM_BASKET: ElementParameters = {
    tag: Tags.TableRow,
    classList: [BasketItemCssClasses.ItemBasket],
  };

  private productId: string;

  private cartParams: CartParameters;

  private imgProductBasket: DOMComponent<HTMLImageElement>;

  private itemBasketName: DOMComponent<HTMLDivElement>;

  private plus: DOMComponent<HTMLSpanElement>;

  private sum: InputDomComponent;

  private minus: DOMComponent<HTMLSpanElement>;

  private priceProduct: InputDomComponent;

  private deleteProduct: DOMComponent<HTMLDivElement>;

  constructor(product: CartProduct, cartParameters: CartParameters) {
    super(BasketItem.ITEM_BASKET);
    const itemBasketImg = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [BasketItemCssClasses.ItemBasketImg],
    });
    this.imgProductBasket = new DOMComponent<HTMLImageElement>({
      tag: Tags.Image,
      classList: [BasketItemCssClasses.ImgProductBasket],
    });
    const itemBasketDetails = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [BasketItemCssClasses.ItemBasketDetails],
    });
    this.itemBasketName = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketItemCssClasses.ItemBasketName],
    });
    const itemBasketQuantity = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [BasketItemCssClasses.ItemBasketQuantity],
    });
    const quantity = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketItemCssClasses.BlokQuantity],
    });

    const quantityProduct = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketItemCssClasses.QuantityProduct],
    });
    this.plus = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [BasketItemCssClasses.PlusProduct],
      textContent: '+',
    });
    this.sum = new InputDomComponent({
      classList: [BasketItemCssClasses.SumProduct],
    });
    this.sum.value = product.quantity.toString();
    this.minus = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [BasketItemCssClasses.MinusProduct],
      textContent: '-',
    });
    const itemBasketPrice = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [BasketItemCssClasses.ItemBasketPrice],
    });
    itemBasketPrice.setAttribute('id', 'price-one-product__basket');
    this.priceProduct = new InputDomComponent({
      classList: [BasketItemCssClasses.PriceProduct],
      attributes: {
        readonly: '',
      },
    });
    this.deleteProduct = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [BasketItemCssClasses.DeleteProduct],
    });
    const deleteIcon = new DOMComponent<HTMLImageElement>({
      tag: Tags.Image,
      attributes: {
        src: `${DeleteIcon}`,
        alt: 'delete',
      },
    });

    this.append(itemBasketImg, itemBasketDetails, itemBasketQuantity, itemBasketPrice, this.deleteProduct);
    itemBasketImg.append(this.imgProductBasket);
    itemBasketDetails.append(this.itemBasketName);
    itemBasketQuantity.append(quantity);
    quantity.append(quantityProduct);
    quantityProduct.append(this.minus, this.sum, this.plus);
    itemBasketPrice.append(this.priceProduct);
    this.deleteProduct.append(deleteIcon);
    this.addInfoProduct(product.product);

    this.productId = product.product.id;
    this.cartParams = cartParameters;

    this.addQuantityChangeHandlers();

    this.deleteProduct.addEventListener(Events.Click, async () => {
      this.delete();
    });
  }

  public addInfoProduct(product: ProductProjection) {
    const { images, prices } = product.masterVariant;
    const urlImage = images ? images[0].url : '';
    this.imgProductBasket.setAttribute('src', `${urlImage}`);
    this.imgProductBasket.setAttribute('alt', 'product');
    const nameArr = product.name;
    const name = Object.values(nameArr);
    this.itemBasketName.addText(name[0]);
    const discountNo = prices ? prices[0].discounted : '';
    const priceValue = prices ? prices[0].value.centAmount : '';
    if (discountNo === undefined) {
      this.priceProduct.value = `$${+priceValue * 0.01}`;
    } else {
      const discountValue = discountNo ? discountNo.value.centAmount : '';
      this.priceProduct.value = `$${Math.round(+discountValue * 0.01).toFixed(2)}`;
    }
  }

  public addQuantityChangeHandlers(): void {
    this.plus.addEventListener(Events.Click, () => {
      const count = +this.sum.value;
      this.cartParams.productUpdater(this.productId, count + 1).then(() => {
        this.sum.value = `${count + 1}`;
      });
    });
    this.minus.addEventListener(Events.Click, () => {
      const count = +this.sum.value;
      if (this.sum.value === '1') {
        this.delete();
      } else {
        this.cartParams.productUpdater(this.productId, count - 1).then(() => {
          this.sum.value = `${count - 1}`;
          this.priceProduct.value = ``;
        });
      }
    });
  }

  private async delete() {
    await this.cartParams.productDeleter(this.productId);
    this.remove();
  }
}
