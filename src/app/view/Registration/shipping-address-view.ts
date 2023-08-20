import DOMComponent from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import InputDomComponents from '../../../components/input-components';

export default class ShippingAddressView {
  shippingAddress: DOMComponent<HTMLDivElement>;

  inputShippingAddressCounty: InputDomComponents;

  messageForShippingAddressCounty: DOMComponent<HTMLSpanElement>;

  inputShippingAddressCity: InputDomComponents;

  messageForShippingAddressCity: DOMComponent<HTMLSpanElement>;

  inputShippingAddressStreet: InputDomComponents;

  messageForShippingAddressStreet: DOMComponent<HTMLSpanElement>;

  inputShippingAddressNumberStreet: InputDomComponents;

  messageForShippingAddressNumberStreet: DOMComponent<HTMLSpanElement>;

  inputShippingAddressPostalCode: InputDomComponents;

  messageForShippingAddressPostalCode: DOMComponent<HTMLSpanElement>;

  inputShippingAddressApartment: InputDomComponents;

  messageForShippingAddressApartment: DOMComponent<HTMLSpanElement>;

  constructor() {
    this.shippingAddress = new DOMComponent<HTMLDivElement>({});
    this.inputShippingAddressCounty = new InputDomComponents({});
    this.messageForShippingAddressCounty = new DOMComponent<HTMLSpanElement>({});
    this.inputShippingAddressCity = new InputDomComponents({});
    this.messageForShippingAddressCity = new DOMComponent<HTMLSpanElement>({});
    this.inputShippingAddressStreet = new InputDomComponents({});
    this.messageForShippingAddressStreet = new DOMComponent<HTMLSpanElement>({});
    this.inputShippingAddressNumberStreet = new InputDomComponents({});
    this.messageForShippingAddressNumberStreet = new DOMComponent<HTMLSpanElement>({});
    this.inputShippingAddressPostalCode = new InputDomComponents({});
    this.messageForShippingAddressPostalCode = new DOMComponent<HTMLSpanElement>({});
    this.inputShippingAddressApartment = new InputDomComponents({});
    this.messageForShippingAddressApartment = new DOMComponent<HTMLSpanElement>({});
  }

  public create(): DOMComponent<HTMLElement> {
    this.shippingAddress = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: ['shipping-address'],
    });

    const titleShippingAddress = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Heading2,
      classList: ['title-shipping-address'],
      textContent: 'Shipping Address',
    });

    const labelShippingAddressCounty = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-shipping-address-country'],
      attributes: { for: 'input-shipping-address-country', required: '' },
    });

    this.inputShippingAddressCounty = new InputDomComponents({
      attributes: {
        id: 'input-shipping-address-country',
        type: 'text',
        placeholder: 'County',
        addEventListener: Events.Input,
      },
    });

    this.messageForShippingAddressCounty = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-shipping-address-county'],
      textContent: 'this field is mandatory',
    });

    const labelShippingAddressCity = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-shipping-address-city'],
      attributes: { for: 'input-shipping-address-city', required: '' },
    });

    this.inputShippingAddressCity = new InputDomComponents({
      attributes: {
        id: 'input-shipping-address-city',
        type: 'text',
        placeholder: 'City',
        addEventListener: Events.Input,
      },
    });

    this.messageForShippingAddressCity = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-shipping-address-city'],
      textContent: 'this field is mandatory',
    });

    const labelShippingAddressStreet = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-shipping-address-street'],
      attributes: { for: 'input-shipping-address-street', required: '' },
    });

    this.inputShippingAddressStreet = new InputDomComponents({
      attributes: {
        id: 'input-shipping-address-street',
        type: 'text',
        placeholder: 'Street',
        addEventListener: Events.Input,
      },
    });

    this.messageForShippingAddressStreet = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-shipping-address-street'],
      textContent: 'this field is mandatory',
    });

    const labelShippingAddressNumberStreet = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-shipping-address-number-street'],
      attributes: { for: 'input-shipping-address-number-street' },
    });

    this.inputShippingAddressNumberStreet = new InputDomComponents({
      attributes: {
        id: 'input-shipping-address-number-street',
        type: 'text',
        placeholder: 'Number street',
        addEventListener: Events.Input,
      },
    });

    this.messageForShippingAddressNumberStreet = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-shipping-address-number-street'],
      textContent: '',
    });

    const labelShippingAddressPostalCode = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-shipping-address-postal-code'],
      attributes: { for: 'input-shipping-address-postal-code', required: '' },
    });

    this.inputShippingAddressPostalCode = new InputDomComponents({
      attributes: {
        id: 'input-shipping-address-postal-code',
        type: 'text',
        placeholder: 'Postal code',
        addEventListener: Events.Input,
      },
    });

    this.messageForShippingAddressPostalCode = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-shipping-address-postal-code'],
      textContent: 'this field is mandatory',
    });

    const labelShippingAddressApartment = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-shipping-address-apartment'],
      attributes: { for: 'input-shipping-address-apartment', required: '' },
    });

    this.inputShippingAddressApartment = new InputDomComponents({
      attributes: {
        id: 'input-shipping-address-apartment',
        type: 'text',
        placeholder: 'Apartment',
        addEventListener: Events.Input,
      },
    });

    this.messageForShippingAddressApartment = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-shipping-address-apartment'],
      textContent: 'this field is mandatory',
    });
    this.shippingAddress.append(
      titleShippingAddress,
      labelShippingAddressCounty,
      this.inputShippingAddressCounty,
      this.messageForShippingAddressCounty,
      labelShippingAddressCity,
      this.inputShippingAddressCity,
      this.messageForShippingAddressCity,
      labelShippingAddressStreet,
      this.inputShippingAddressStreet,
      this.messageForShippingAddressStreet,
      labelShippingAddressNumberStreet,
      this.inputShippingAddressNumberStreet,
      this.messageForShippingAddressNumberStreet,
      labelShippingAddressApartment,
      this.inputShippingAddressApartment,
      this.messageForShippingAddressApartment,
      labelShippingAddressPostalCode,
      this.inputShippingAddressPostalCode,
      this.messageForShippingAddressPostalCode
    );
    return this.shippingAddress;
  }
}
