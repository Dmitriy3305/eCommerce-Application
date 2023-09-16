import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import ProductsRepository from '../../api/products';
import InputDomComponent from '../../../components/inputs/input-component';

enum ItemBasketCssClasses {
  ItemBasket = 'item__basket',
  ItemBasketImg = 'item-img__basket',
  ImgProductBasket = 'img-product__basket',
  ItemBasketDetails = 'item-details__basket',
  ItemBasketName = 'item-name__basket',
  ItemBasketQuantity = 'item-quantity__basket',
  BlokQuantity = 'quantity__basket',
  QuantityProduct = 'quantity-product__basket',
  PlusProduct = 'plus-product',
  SumProduct = 'sum-product',
  MinusProduct = 'minus-product',
  ItemBasketPrice = 'item-price__basket',
  PriceProduct = 'price-product__basket',
}

export default class ItemBasket extends DOMComponent<HTMLElement> {
  private static ITEM_BASKET: ElementParameters = {
    tag: Tags.TableRow,
    classList: [ItemBasketCssClasses.ItemBasket],
  };

  private imgProductBasket: DOMComponent<HTMLImageElement>;

  private itemBasketName: DOMComponent<HTMLDivElement>;

  private plus: DOMComponent<HTMLSpanElement>;

  private sum: InputDomComponent;

  private minus: DOMComponent<HTMLSpanElement>;

  private priceProduct: InputDomComponent;

  constructor() {
    super(ItemBasket.ITEM_BASKET);
    const itemBasketImg = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [ItemBasketCssClasses.ItemBasketImg],
    });
    this.imgProductBasket = new DOMComponent<HTMLImageElement>({
      tag: Tags.Image,
      classList: [ItemBasketCssClasses.ImgProductBasket],
    });
    const itemBasketDetails = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [ItemBasketCssClasses.ItemBasketDetails],
    });
    this.itemBasketName = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [ItemBasketCssClasses.ItemBasketName],
    });
    const itemBasketQuantity = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [ItemBasketCssClasses.ItemBasketQuantity],
    });
    const quantity = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [ItemBasketCssClasses.BlokQuantity],
    });

    const quantityProduct = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [ItemBasketCssClasses.QuantityProduct],
    });
    this.plus = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [ItemBasketCssClasses.PlusProduct],
      textContent: '+',
    });
    this.sum = new InputDomComponent({
      classList: [ItemBasketCssClasses.SumProduct],
    });
    this.sum.value = `1`;
    this.minus = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [ItemBasketCssClasses.MinusProduct],
      textContent: '-',
    });
    const itemBasketPrice = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableDataCell,
      classList: [ItemBasketCssClasses.ItemBasketPrice],
    });
    itemBasketPrice.setAttribute('id', 'price-one-product__basket');
    this.priceProduct = new InputDomComponent({
      classList: [ItemBasketCssClasses.PriceProduct],
      attributes: {
        readonly: '',
      },
    });

    this.append(itemBasketImg, itemBasketDetails, itemBasketQuantity, itemBasketPrice);
    itemBasketImg.append(this.imgProductBasket);
    itemBasketDetails.append(this.itemBasketName);
    itemBasketQuantity.append(quantity);
    quantity.append(quantityProduct);
    quantityProduct.append(this.minus, this.sum, this.plus);
    itemBasketPrice.append(this.priceProduct);
    this.addInfoProduct();
    this.changeQuantity();
  }

  public addInfoProduct() {
    const shoes = new ProductsRepository();
    const shoesProduct = shoes.getProductByKey("timberland 6' premium boot");
    shoesProduct.then((result) => {
      const { images } = result.masterData.current.masterVariant;
      let urlImage;
      if (images === undefined) {
        urlImage = '';
      } else {
        urlImage = images ? images[0].url : '';
      }
      this.imgProductBasket.setAttribute('src', `${urlImage}`);
      this.imgProductBasket.setAttribute('alt', 'product');
      const nameArr = result.masterData.current.name;
      const name = Object.values(nameArr);
      this.itemBasketName.addText(name[0]);
      const { prices } = result.masterData.current.masterVariant;
      const discountNo = prices ? prices[0].discounted : '';
      const priceValue = prices ? prices[0].value.centAmount : '';
      if (discountNo === undefined) {
        this.priceProduct.value = `$${+priceValue * 0.01}`;
      } else {
        const discountValue = discountNo ? discountNo.value.centAmount : '';
        this.priceProduct.value = `$${Math.round(+discountValue * 0.01).toFixed(2)}`;
      }
    });
  }

  public changeQuantity(): void {
    this.plus.addEventListener(Events.Click, () => {
      const count = +this.sum.value;
      const price = +this.priceProduct.value.substring(1) / count;
      this.sum.value = `${count + 1}`;
      this.priceProduct.value = `$${Math.round(+price * (+count + 1)).toFixed(2)}`;
    });
    this.minus.addEventListener(Events.Click, () => {
      const count = +this.sum.value;
      if (this.sum.value === '1') {
        this.clear();
      } else {
        const price = +this.priceProduct.value.substring(1) / count;
        this.sum.value = `${count - 1}`;
        this.priceProduct.value = `$${Math.round(+price * (+count - 1)).toFixed(2)}`;
      }
    });
  }
}
