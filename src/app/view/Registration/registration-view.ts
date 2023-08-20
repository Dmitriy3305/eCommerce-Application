import DOMComponent from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import InputDomComponents from '../../../components/input-components';
import ValidationInput from '../../controller/validationForms';
import PasswordShow from '../../controller/showPassword';
import ShippingAddressView from './shipping-address-view';
import BillingAddressView from './billingAddress';

export default class RegistrationView extends AppView {
  public messageForLastName!: DOMComponent<HTMLSpanElement>;

  public messageForFirstName!: DOMComponent<HTMLSpanElement>;

  public inputFirstName!: InputDomComponents;

  public inputLastName!: InputDomComponents;

  public inputEmail!: InputDomComponents;

  public inputPassword!: InputDomComponents;

  public messageForEmail!: DOMComponent<HTMLSpanElement>;

  public btnShowPassword!: DOMComponent<HTMLButtonElement>;

  public messageForPassword!: DOMComponent<HTMLSpanElement>;

  public inputDateOfBirth!: InputDomComponents;

  public messageForDateOfBirth!: DOMComponent<HTMLSpanElement>;

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

    const labelFirstName = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-first-name'],
      attributes: { for: 'input-first-name' },
    });

    this.inputFirstName = new InputDomComponents({
      attributes: {
        id: 'input-first-name',
        type: 'text',
        placeholder: 'First name',
        addEventListener: Events.Input,
        required: '',
      },
      parent: registrationForm,
    });

    this.messageForFirstName = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-first-name'],
      textContent: 'this field is mandatory',
    });

    const labelLastName = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-last-name'],
      attributes: { for: 'first-name' },
    });

    this.inputLastName = new InputDomComponents({
      attributes: {
        id: 'input-last-name',
        type: 'text',
        placeholder: 'Last name',
        addEventListener: Events.Input,
        required: '',
      },
      parent: registrationForm,
    });

    this.messageForLastName = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-last-name'],
      textContent: 'this field is mandatory',
    });

    const labelDateOfBirth = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-date-of-birth'],
      attributes: { for: 'first-name' },
    });

    this.inputDateOfBirth = new InputDomComponents({
      attributes: {
        id: 'input-date-of-birth',
        type: 'text',
        placeholder: 'Last name',
        addEventListener: Events.Input,
        required: '',
      },
      parent: registrationForm,
    });

    this.messageForDateOfBirth = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-date-of-birth'],
      textContent: 'this field is mandatory',
    });

    const labelEmail = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-email'],
      attributes: { for: 'input-email' },
    });

    this.inputEmail = new InputDomComponents({
      attributes: {
        id: 'input-email',
        type: 'email',
        placeholder: 'Email',
        addEventListener: Events.Input,
        required: '',
      },
      parent: registrationForm,
    });

    this.messageForEmail = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-email'],
      parent: registrationForm,
      textContent: 'this field is mandatory',
    });

    const labelPassword = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-password'],
      attributes: { for: 'input-password' },
    });

    const inputPasswordContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: ['input-password-container'],
    });

    this.inputPassword = new InputDomComponents({
      attributes: {
        id: 'input-password',
        type: 'password',
        placeholder: 'Password',
        maxlength: '20',
        required: '',
      },
      parent: inputPasswordContainer,
    });

    this.messageForPassword = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-password'],
      parent: registrationForm,
      textContent: 'this field is mandatory',
    });

    this.btnShowPassword = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['btn-show-password-hide'],
    });

    inputPasswordContainer.append(labelPassword, this.inputPassword, this.btnShowPassword);
    main.append(title, registrationForm);

    const infoOfAddress = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: ['info-of-address'],
    });
    const shippingAddress = new ShippingAddressView();
    const billingAddress = new BillingAddressView();
    infoOfAddress.append(shippingAddress.create(), billingAddress.create());

    const RegistrationButton = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['sign-up'],
      textContent: 'Sign up',
    });

    registrationForm.append(
      titlePersonal,
      labelFirstName,
      this.inputFirstName,
      this.messageForFirstName,
      labelLastName,
      this.inputLastName,
      this.messageForLastName,
      labelEmail,
      this.inputEmail,
      this.messageForEmail,
      labelDateOfBirth,
      this.inputDateOfBirth,
      this.messageForDateOfBirth,
      inputPasswordContainer,
      this.messageForPassword,
      infoOfAddress,
      RegistrationButton
    );

    const passwordShow = new PasswordShow(this.inputPassword, this.btnShowPassword);
    passwordShow.togglePasswordVisibility();

    const inputShippingAddressCounty = shippingAddress.inputShippingAddressCounty.value;
    /* const messageForShippingAddressCounty = shippingAddress.messageForShippingAddressCounty.textContent;
    const inputShippingAddressCity = shippingAddress.inputShippingAddressCity.value;
    const messageForShippingAddressCity = shippingAddress.messageForShippingAddressCity.textContent;
    const inputShippingAddressStreet = shippingAddress.inputShippingAddressStreet.value;
    const messageForShippingAddressStreet = shippingAddress.messageForShippingAddressStreet.textContent;
    const inputShippingAddressNumberStreet = shippingAddress.inputShippingAddressNumberStreet.value;
    const messageForShippingAddressNumberStreet = shippingAddress.messageForShippingAddressNumberStreet.textContent;
    const inputShippingAddressPostalCode = shippingAddress.inputShippingAddressPostalCode.value;
    const messageForShippingAddressPostalCode = shippingAddress.messageForShippingAddressPostalCode.textContent;
    const inputShippingAddressApartment = shippingAddress.inputShippingAddressApartment.value;
    const messageForShippingAddressApartment = shippingAddress.messageForShippingAddressApartment.textContent;

    const inputBillingAddressCounty = billingAddress.inputBillingAddressCounty.value;
    const messageForBillingAddressCounty = billingAddress.messageForBillingAddressCounty.textContent;
    const inputBillingAddressCity = billingAddress.inputBillingAddressCity.value;
    const messageForBillingAddressCity = billingAddress.messageForBillingAddressCity.textContent;
    const inputBillingAddressStreet = billingAddress.inputBillingAddressStreet.value;
    const messageForBillingAddressStreet = billingAddress.messageForBillingAddressStreet.textContent;
    const inputBillingAddressNumberStreet = billingAddress.inputBillingAddressNumberStreet.value;
    const messageForBillingAddressNumberStreet = billingAddress.messageForBillingAddressNumberStreet.textContent;
    const inputBillingAddressPostalCode = billingAddress.inputBillingAddressPostalCode.value;
    const messageForBillingAddressPostalCode = billingAddress.messageForBillingAddressPostalCode.textContent;
    const inputBillingAddressApartment = billingAddress.inputBillingAddressApartment.value;
    const messageForBillingAddressApartment = billingAddress.messageForBillingAddressApartment.textContent;
*/

    const validationInput = new ValidationInput(
      this.inputEmail,
      this.inputPassword,
      this.messageForEmail,
      this.messageForPassword,
      this.inputDateOfBirth,
      this.messageForDateOfBirth,
      this.inputFirstName,
      this.messageForFirstName,
      this.inputLastName,
      this.messageForLastName,
      inputShippingAddressCounty
    );
    validationInput.validationEmail();
    validationInput.validationFirstName();
    return main;
  }
}
