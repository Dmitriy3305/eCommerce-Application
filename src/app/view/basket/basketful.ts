import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import BasketItem from './create-item-basket';
import InputDomComponent from '../../../components/inputs/input-component';
import { CartParameters } from '../../../types/app-parameters';
import AppRouter from '../../router/router';
import { showErrorToastify } from '../../../utils/toastify';

enum BasketfulCssClasses {
  WrapperBasketful = 'basket__wrapper',
  Basketful = 'basket__basketful',
  TitleBlock = 'basket__title_block',
  TitleBasketful = 'basket__title_basketful',
  ClearCart = 'basket__clear-cart',
  FormBasket = 'basket__content',
  TableItems = 'basket__table',
  TableHeaderProduct = 'basket__header-product',
  TableHeaderDetails = 'basket__header_details',
  TableHeaderQuantity = 'basket__header-quantity',
  TableHeaderTotal = 'basket__header_total',
  TableHeaderDelete = 'basket__header_delete',
  TitleTable = 'basket__title_table',
  FooterBasket = 'basket__footer',
  PromoBlock = 'basket__promo',
  NamePromo = 'basket__promo__name',
  Board = 'basket__board',
  BoardPromo = 'basket__board_promo',
  ButtonSubmitPromo = 'basket__submit_promo',
  PriceBlock = 'basket__price',
  PriceNotDiscount = 'basket__price-not-discount',
  PriceDiscount = 'basket__price-discount',
  PriceTitle = 'basket__price-title',
  PriceValue = 'basket__price-value',
  PriceTitleDiscount = 'basket__price-title-discount',
  PriceValueDiscount = 'basket__price-value-discount',
  ButtonCheckOut = 'basket__check-out',
}

class Basketful extends DOMComponent<HTMLElement> {
  private static BASKET_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [BasketfulCssClasses.Basketful],
  };

  private tableBody;

  private valuePrice: DOMComponent<HTMLDivElement>;

  private valuePriceDiscount: DOMComponent<HTMLDivElement>;

  private clearCart: DOMComponent<HTMLButtonElement>;

  constructor(cartParameters: CartParameters, router: AppRouter) {
    super(Basketful.BASKET_PARAMS);
    const wrapper = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.WrapperBasketful],
    });
    const titleBlock = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [BasketfulCssClasses.TitleBlock],
    });
    const titleBasketful = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading1,
      classList: [BasketfulCssClasses.TitleBasketful],
      textContent: 'Your cart',
    });
    this.clearCart = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [BasketfulCssClasses.ClearCart],
      textContent: 'Clear cart',
    });
    const formBasket = new DOMComponent<HTMLFormElement>({
      tag: Tags.Form,
      classList: [BasketfulCssClasses.FormBasket],
    });
    const tableItems = new DOMComponent<HTMLTableElement>({
      tag: Tags.Table,
      classList: [BasketfulCssClasses.TableItems],
    });
    const tableHead = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableHead,
    });
    const tableRowHead = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableRow,
    });
    const tableHeaderProduct = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderProduct],
      textContent: 'PRODUCT',
    });
    const tableHeaderDetails = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderDetails],
    });
    const tableHeaderQuantity = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderQuantity],
      textContent: 'QUANTITY',
    });
    const tableHeaderTotal = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderTotal],
      textContent: 'TOTAL',
    });
    const tableHeaderDelete = new DOMComponent<HTMLTableElement>({
      tag: Tags.TableHeader,
      classList: [BasketfulCssClasses.TableHeaderDelete],
    });
    this.tableBody = new DOMComponent<HTMLTableElement>({
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
    wrapper.append(titleBlock, formBasket, footerBasket);
    titleBlock.append(titleBasketful, this.clearCart);
    formBasket.append(tableItems);
    tableItems.append(tableHead, this.tableBody);
    tableHead.append(tableRowHead);
    tableRowHead.append(
      tableHeaderProduct,
      tableHeaderDetails,
      tableHeaderQuantity,
      tableHeaderTotal,
      tableHeaderDelete
    );
    footerBasket.append(blokPromo, blokPrice);
    blokPromo.append(namePromo, board);
    board.append(boardPromo, buttonSubmitPromo);
    blokPrice.append(priceNotDiscount, priceDiscount, buttonCheckOut);
    priceNotDiscount.append(priceTitle, this.valuePrice);
    priceDiscount.append(priceTitleDiscount, this.valuePriceDiscount);

    this.clearCart.addEventListener(Events.Click, async () => {
      await cartParameters.cartClearer();
      router.reload();
    });

    cartParameters.productsGetter().then((products) => {
      products.forEach((product) => this.tableBody.append(new BasketItem(product, router, cartParameters)));
    });

    cartParameters.totalPriceGetter().then((price) => {
      this.valuePrice.textContent = `${price}$`;
    });

    buttonSubmitPromo.addEventListener(Events.Click, async () => {
      try {
        await cartParameters.discountApplyer(boardPromo.value);
      } catch {
        showErrorToastify('Your promocode is not valid');
      }
    });
  }
}

export default Basketful;
