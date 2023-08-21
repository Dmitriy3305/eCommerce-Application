import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import ValidationInput from '../../controller/validationForms';
import ShippingAddressView from './shipping-address-view';
import BillingAddressView from './billingAddress';
import PersonalView from './personal-view';

export default class RegistrationView extends AppView {
  public get pageName(): string {
    return 'main-registration';
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    const title = new DOMComponent<HTMLElement>({
      tag: Tags.Heading1,
      classList: ['title'],
      textContent: 'Registration',
    });

    const registrationForm = new DOMComponent<HTMLFormElement>({
      tag: Tags.Form,
      classList: ['form'],
      parent: main,
    });

    const titlePersonal = new DOMComponent<HTMLElement>({
      tag: Tags.Heading2,
      classList: ['title-personal'],
      textContent: 'Personal',
    });

    const infoOfAddress = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: ['info-of-address'],
    });
    const personal = new PersonalView();
    const personalView = personal.create();
    const shippingAddress = new ShippingAddressView();
    const billingAddress = new BillingAddressView();
    infoOfAddress.append(shippingAddress.create(), billingAddress.create());

    const RegistrationButton = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['sign-up'],
      textContent: 'Sign up',
    });

    registrationForm.append(title, titlePersonal, personalView, infoOfAddress, RegistrationButton);

    const { inputFirstName } = personal;
    const { messageForFirstName } = personal;
    const { inputLastName } = personal;
    const { messageForLastName } = personal;
    const { inputEmail } = personal;
    const { messageForEmail } = personal;
    const { inputPassword } = personal;
    const { messageForPassword } = personal;
    const { inputDateOfBirth } = personal;
    const { messageForDateOfBirth } = personal;
    const { btnShowPassword } = personal;

    const { inputShippingAddressCounty } = shippingAddress;
    const { messageForShippingAddressCounty } = shippingAddress;
    const { inputShippingAddressCity } = shippingAddress;
    const { messageForShippingAddressCity } = shippingAddress;
    const { inputShippingAddressStreet } = shippingAddress;
    const { messageForShippingAddressStreet } = shippingAddress;
    const { inputShippingAddressNumberStreet } = shippingAddress;
    const { messageForShippingAddressNumberStreet } = shippingAddress;
    const { inputShippingAddressPostalCode } = shippingAddress;
    const { messageForShippingAddressPostalCode } = shippingAddress;
    const { inputShippingAddressApartment } = shippingAddress;
    const { messageForShippingAddressApartment } = shippingAddress;

    const { inputBillingAddressCounty } = billingAddress;
    const { messageForBillingAddressCounty } = billingAddress;
    const { inputBillingAddressCity } = billingAddress;
    const { messageForBillingAddressCity } = billingAddress;
    const { inputBillingAddressStreet } = billingAddress;
    const { messageForBillingAddressStreet } = billingAddress;
    const { inputBillingAddressNumberStreet } = billingAddress;
    const { messageForBillingAddressNumberStreet } = billingAddress;
    const { inputBillingAddressPostalCode } = billingAddress;
    const { messageForBillingAddressPostalCode } = billingAddress;
    const { inputBillingAddressApartment } = billingAddress;
    const { messageForBillingAddressApartment } = billingAddress;

    const validationInput = new ValidationInput(
      inputEmail,
      messageForEmail,
      inputPassword,
      messageForPassword,
      inputFirstName,
      messageForFirstName,
      inputLastName,
      messageForLastName,
      inputDateOfBirth,
      messageForDateOfBirth,
      btnShowPassword,
      inputShippingAddressCounty,
      messageForShippingAddressCounty,
      inputShippingAddressCity,
      messageForShippingAddressCity,
      inputShippingAddressStreet,
      messageForShippingAddressStreet,
      inputShippingAddressNumberStreet,
      messageForShippingAddressNumberStreet,
      inputShippingAddressPostalCode,
      messageForShippingAddressPostalCode,
      inputShippingAddressApartment,
      messageForShippingAddressApartment,
      inputBillingAddressCounty,
      messageForBillingAddressCounty,
      inputBillingAddressCity,
      messageForBillingAddressCity,
      inputBillingAddressStreet,
      messageForBillingAddressStreet,
      inputBillingAddressNumberStreet,
      messageForBillingAddressNumberStreet,
      inputBillingAddressPostalCode,
      messageForBillingAddressPostalCode,
      inputBillingAddressApartment,
      messageForBillingAddressApartment
    );
    validationInput.validationFirstName();
    validationInput.validationLastName();
    validationInput.validationEmail();
    validationInput.validationPassword();
    validationInput.validationDateOfBirth();
    validationInput.validationShippingStreet();
    return main;
  }
}
