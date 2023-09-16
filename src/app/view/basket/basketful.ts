import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import ItemBasket from './create-item-basket';
import InputDomComponent from '../../../components/inputs/input-component';

enum BasketfulCssClasses {
  WrapperBasketful = 'wrapper__basket',
  Basketful = 'basketful',
  TitleBasketful = 'title__basketful',
  FormBasket = 'content__basket',
  TableItems = 'table_basket',
  TableHeaderProduct = 'header-product__basket',
  TableHeaderDetails = 'header-details__basket',
  TableHeaderQuantity = 'header-quantity__basket',
  TableHeaderTotal = 'header-total__basket',
  TitleTable = 'title-table__basket',
  FooterBasket = 'footer-basket',
  PromoBlock = 'promo__basket',
  NamePromo = 'promo__name',
  Board = 'board__basket',
  BoardPromo = 'board__promo',
  ButtonSubmitPromo = 'submit-promo',
  PriceBlock = 'price__basket',
  PriceNotDiscount = 'price-not-discount__basket',
  PriceDiscount = 'price-discount__basket',
  PriceTitle = 'price-title__basket',
  PriceValue = 'price-value__basket',
  PriceTitleDiscount = 'price-title-discount__basket',
  PriceValueDiscount = 'price-value-discount__basket',
  ButtonCheckOut = 'check-out__basket',
}

class Basketful extends DOMComponent<HTMLElement> {
  private static BASKET_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [BasketfulCssClasses.Basketful],
  };

  private tableBody;

  private valuePrice: DOMComponent<HTMLDivElement>;

  private valuePriceDiscount: DOMComponent<HTMLDivElement>;

  constructor() {
    super(Basketful.BASKET_PARAMS);
    const wrapper = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.WrapperBasketful],
    });
    const titleBasketful = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading1,
      classList: [BasketfulCssClasses.TitleBasketful],
      textContent: 'Your cart',
    });
    const formBasket = new DOMComponent<HTMLFormElement>({
      tag: Tags.Form,
      classList: [BasketfulCssClasses.FormBasket],
    });
    const tableItems = new DOMComponent<HTMLElement>({
      tag: Tags.Table,
      classList: [BasketfulCssClasses.TableItems],
    });
    const tableHead = new DOMComponent<HTMLElement>({
      tag: Tags.TableHead,
    });
    const tableRowHead = new DOMComponent<HTMLElement>({
      tag: Tags.TableRow,
    });
    const tableHeaderProduct = new DOMComponent<HTMLElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderProduct],
      textContent: 'PRODUCT',
    });
    const tableHeaderDetails = new DOMComponent<HTMLElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderDetails],
    });
    const tableHeaderQuantity = new DOMComponent<HTMLElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderQuantity],
      textContent: 'QUANTITY',
    });
    const tableHeaderTotal = new DOMComponent<HTMLElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderTotal],
      textContent: 'TOTAL',
    });
    this.tableBody = new DOMComponent<HTMLElement>({
      tag: Tags.TableBody,
    });
    const footerBasket = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.FooterBasket],
    });
    const blokPromo = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.PromoBlock],
    });
    const namePromo = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading2,
      classList: [BasketfulCssClasses.NamePromo],
      textContent: `Promotional code`,
    });
    const board = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.Board],
    });
    const boardPromo = new InputDomComponent({
      classList: [BasketfulCssClasses.BoardPromo],
      attributes: {
        placeholder: 'Enter promotional code',
      },
    });
    const buttonSubmitPromo = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [BasketfulCssClasses.ButtonSubmitPromo],
      textContent: 'Enter',
    });
    const blokPrice = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.PriceBlock],
    });
    const priceNotDiscount = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.PriceNotDiscount],
    });
    const priceTitle = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading2,
      classList: [BasketfulCssClasses.PriceTitle],
      textContent: `Subtotal`,
    });
    this.valuePrice = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.PriceValue],
    });
    const priceDiscount = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.PriceDiscount],
    });
    const priceTitleDiscount = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading2,
      classList: [BasketfulCssClasses.PriceTitleDiscount],
      textContent: `Subtotal with discount`,
    });
    this.valuePriceDiscount = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.PriceValueDiscount],
    });
    const buttonCheckOut = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [BasketfulCssClasses.ButtonCheckOut],
      textContent: 'Check out',
    });

    this.append(wrapper);
    wrapper.append(titleBasketful, formBasket, footerBasket);
    formBasket.append(tableItems);
    tableItems.append(tableHead, this.tableBody);
    tableHead.append(tableRowHead);
    tableRowHead.append(tableHeaderProduct, tableHeaderDetails, tableHeaderQuantity, tableHeaderTotal);
    footerBasket.append(blokPromo, blokPrice);
    blokPromo.append(namePromo, board);
    board.append(boardPromo, buttonSubmitPromo);
    blokPrice.append(priceNotDiscount, priceDiscount, buttonCheckOut);
    priceNotDiscount.append(priceTitle, this.valuePrice);
    priceDiscount.append(priceTitleDiscount, this.valuePriceDiscount);
    this.addingNewProduct();
  }

  public addingNewProduct() {
    const itemProduct = new ItemBasket();
    this.tableBody.append(itemProduct);
  }
}

export default Basketful;
