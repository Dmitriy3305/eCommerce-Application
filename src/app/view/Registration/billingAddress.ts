import DOMComponent from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import InputDomComponents from '../../../components/input-components';

export default class BillingAddressView {
  billingAddress: DOMComponent<HTMLDivElement>;

  inputBillingAddressCounty: InputDomComponents;

  messageForBillingAddressCounty: DOMComponent<HTMLSpanElement>;

  inputBillingAddressCity: InputDomComponents;

  messageForBillingAddressCity: DOMComponent<HTMLSpanElement>;

  inputBillingAddressStreet: InputDomComponents;

  messageForBillingAddressStreet: DOMComponent<HTMLSpanElement>;

  inputBillingAddressNumberStreet: InputDomComponents;

  messageForBillingAddressNumberStreet: DOMComponent<HTMLSpanElement>;

  inputBillingAddressPostalCode: InputDomComponents;

  messageForBillingAddressPostalCode: DOMComponent<HTMLSpanElement>;

  inputBillingAddressApartment: InputDomComponents;

  messageForBillingAddressApartment: DOMComponent<HTMLSpanElement>;

  constructor() {
    this.billingAddress = new DOMComponent<HTMLDivElement>({});
    this.inputBillingAddressCounty = new InputDomComponents({});
    this.messageForBillingAddressCounty = new DOMComponent<HTMLSpanElement>({});
    this.inputBillingAddressCity = new InputDomComponents({});
    this.messageForBillingAddressCity = new DOMComponent<HTMLSpanElement>({});
    this.inputBillingAddressStreet = new InputDomComponents({});
    this.messageForBillingAddressStreet = new DOMComponent<HTMLSpanElement>({});
    this.inputBillingAddressNumberStreet = new InputDomComponents({});
    this.messageForBillingAddressNumberStreet = new DOMComponent<HTMLSpanElement>({});
    this.inputBillingAddressPostalCode = new InputDomComponents({});
    this.messageForBillingAddressPostalCode = new DOMComponent<HTMLSpanElement>({});
    this.inputBillingAddressApartment = new InputDomComponents({});
    this.messageForBillingAddressApartment = new DOMComponent<HTMLSpanElement>({});
  }

  public create(): DOMComponent<HTMLElement> {
    this.billingAddress = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: ['billing-address'],
    });

    const titleBillingAddress = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Heading2,
      classList: ['title-billing-address'],
      textContent: 'Billing Address',
    });

    const labelBillingAddressCounty = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-billing-address-country'],
      attributes: { for: 'input-billing-address-country' },
    });

    this.inputBillingAddressCounty = new InputDomComponents({
      attributes: {
        id: 'input-billing-address-country',
        type: 'text',
        placeholder: 'County',
        addEventListener: Events.Input,
      },
      parent: this.billingAddress,
    });

    this.messageForBillingAddressCounty = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-billing-address-county'],
      textContent: '',
    });

    const labelBillingAddressCity = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-billing-address-city'],
      attributes: { for: 'input-billing-address-city' },
    });

    this.inputBillingAddressCity = new InputDomComponents({
      attributes: {
        id: 'input-billing-address-city',
        type: 'text',
        placeholder: 'City',
        addEventListener: Events.Input,
      },
    });

    this.messageForBillingAddressCity = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-billing-address-city'],
      textContent: '',
    });

    const labelBillingAddressStreet = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-billing-address-street'],
      attributes: { for: 'input-billing-address-street' },
    });

    this.inputBillingAddressStreet = new InputDomComponents({
      attributes: {
        id: 'input-billing-address-street',
        type: 'text',
        placeholder: 'Street',
        addEventListener: Events.Input,
      },
    });

    this.messageForBillingAddressStreet = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-billing-address-street'],
      textContent: '',
    });

    const labelBillingAddressNumberStreet = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-billing-address-number-street'],
      attributes: { for: 'input-billing-address-number-street' },
      parent: this.billingAddress,
    });

    this.inputBillingAddressNumberStreet = new InputDomComponents({
      attributes: {
        id: 'input-billing-address-number-street',
        type: 'text',
        placeholder: 'Number street',
        addEventListener: Events.Input,
      },
    });

    this.messageForBillingAddressNumberStreet = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-billing-address-number-street'],
      textContent: '',
    });

    const labelBillingAddressApartment = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-billing-address-apartment'],
      attributes: { for: 'input-billing-address-apartment' },
    });

    this.inputBillingAddressApartment = new InputDomComponents({
      attributes: {
        id: 'input-billing-address-apartment',
        type: 'text',
        placeholder: 'Apartment',
        addEventListener: Events.Input,
      },
    });

    this.messageForBillingAddressApartment = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-billing-address-apartment'],
      textContent: '',
    });

    const labelBllingAddressPostalCode = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-billing-address-postal-code'],
      attributes: { for: 'input-billing-address-postal-code' },
    });

    this.inputBillingAddressPostalCode = new InputDomComponents({
      attributes: {
        id: 'input-billing-address-postal-code',
        type: 'text',
        placeholder: 'Postal code',
        addEventListener: Events.Input,
      },
    });

    this.messageForBillingAddressPostalCode = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-billing-address-postal-code'],
      textContent: '',
    });

    this.billingAddress.append(
      titleBillingAddress,
      labelBillingAddressCounty,
      this.inputBillingAddressCounty,
      this.messageForBillingAddressCounty,
      labelBillingAddressCity,
      this.inputBillingAddressCity,
      this.messageForBillingAddressCity,
      labelBillingAddressStreet,
      this.inputBillingAddressStreet,
      this.messageForBillingAddressStreet,
      labelBillingAddressNumberStreet,
      this.inputBillingAddressNumberStreet,
      this.messageForBillingAddressNumberStreet,
      labelBillingAddressApartment,
      this.inputBillingAddressApartment,
      this.messageForBillingAddressApartment,
      labelBllingAddressPostalCode,
      this.inputBillingAddressPostalCode,
      this.messageForBillingAddressPostalCode
    );
    return this.billingAddress;
  }
}
