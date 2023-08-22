import DOMComponent from '../../components/base-component';
import { Events } from '../../types/dom-types/enums';
import InputDomComponents from '../../components/input-component';

const enum Messages {
  ValidName = 'Your name is valid',
  NotValidEmail = 'Please enter a valid email',
  ValidEmail = 'Your email is valid',
  ValidPassword = 'Your password is valid',
  ValidPDate = 'Your date of birth is valid',
  ValidStreet = 'Your street is valid',
}

export default class ValidationInput {
  constructor(
    public inputEmail?: InputDomComponents,
    public messageForEmail?: DOMComponent<HTMLSpanElement>,
    public inputPassword?: InputDomComponents,
    public messageForPassword?: DOMComponent<HTMLSpanElement>,
    public inputFirstName?: InputDomComponents,
    public messageForFirstName?: DOMComponent<HTMLSpanElement>,
    public inputLastName?: InputDomComponents,
    public messageForLastName?: DOMComponent<HTMLSpanElement>,
    public inputDateOfBirth?: InputDomComponents,
    public messageForDateOfBirth?: DOMComponent<HTMLSpanElement>,
    public btnShowPassword?: DOMComponent<HTMLButtonElement>,
    public inputShippingAddressCountry?: InputDomComponents,
    public messageForShippingAddressCountry?: DOMComponent<HTMLSpanElement>,
    public inputShippingAddressCity?: InputDomComponents,
    public messageForShippingAddressCity?: DOMComponent<HTMLSpanElement>,
    public inputShippingAddressStreet?: InputDomComponents,
    public messageForShippingAddressStreet?: DOMComponent<HTMLSpanElement>,
    public inputShippingAddressNumberStreet?: InputDomComponents,
    public messageForShippingAddressNumberStreet?: DOMComponent<HTMLSpanElement>,
    public inputShippingAddressPostalCode?: InputDomComponents,
    public messageForShippingAddressPostalCode?: DOMComponent<HTMLSpanElement>,
    public inputShippingAddressApartment?: InputDomComponents,
    public messageForShippingAddressApartment?: DOMComponent<HTMLSpanElement>,
    public inputBillingAddressCounty?: InputDomComponents,
    public messageForBillingAddressCounty?: DOMComponent<HTMLSpanElement>,
    public inputBillingAddressCity?: InputDomComponents,
    public messageForBillingAddressCity?: DOMComponent<HTMLSpanElement>,
    public inputBillingAddressStreet?: InputDomComponents,
    public messageForBillingAddressStreet?: DOMComponent<HTMLSpanElement>,
    public inputBillingAddressNumberStreet?: InputDomComponents,
    public messageForBillingAddressNumberStreet?: DOMComponent<HTMLSpanElement>,
    public inputBillingAddressPostalCode?: InputDomComponents,
    public messageForBillingAddressPostalCode?: DOMComponent<HTMLSpanElement>,
    public inputBillingAddressApartment?: InputDomComponents,
    public messageForBillingAddressApartment?: DOMComponent<HTMLSpanElement>
  ) {}

  public validationFirstName() {
    this.inputFirstName?.setEventHandler(Events.Input, (value: string) => {
      const isValid = this.inputFirstName?.validateName(value);
      if (isValid?.length === 0 && this.messageForFirstName) {
        this.messageForFirstName.textContent = Messages.ValidName;
        this.inputFirstName?.removeAttribute('invalid');
      } else if (this.messageForFirstName) {
        this.inputFirstName?.setAttribute('invalid', '');
        const errorMessage = isValid?.join('');
        if (this.messageForFirstName && errorMessage) {
          this.messageForFirstName.textContent = errorMessage;
        }
      }
    });
  }

  public validationLastName() {
    this.inputLastName?.setEventHandler(Events.Input, (value: string) => {
      const isValid = this.inputLastName?.validateName(value);
      if (isValid?.length === 0 && this.messageForLastName) {
        this.messageForLastName.textContent = Messages.ValidName;
        this.inputLastName?.removeAttribute('invalid');
      } else if (this.messageForLastName) {
        this.inputLastName?.setAttribute('invalid', '');
        const errorMessage = isValid?.join('');
        if (this.messageForLastName && errorMessage) {
          this.messageForLastName.textContent = errorMessage;
        }
      }
    });
  }

  public validationEmail() {
    this.inputEmail?.setEventHandler(Events.Input, (value: string) => {
      const isValid = this.inputEmail?.validateEmail(value);
      if (isValid && this.messageForEmail) {
        this.messageForEmail.textContent = Messages.ValidEmail;
        this.inputEmail?.removeAttribute('invalid');
      } else if (this.messageForEmail) {
        this.messageForEmail.textContent = Messages.NotValidEmail;
        this.inputEmail?.setAttribute('invalid', '');
      }
    });
  }

  public validationPassword() {
    this.inputPassword?.setEventHandler(Events.Input, (value: string) => {
      const validationResult = this.inputPassword?.validatePassword(value);
      if (validationResult?.length === 0 && this.messageForPassword) {
        this.messageForPassword.textContent = Messages.ValidPassword;
        this.inputPassword?.removeAttribute('invalid');
      } else if (this.messageForPassword) {
        this.inputPassword?.setAttribute('invalid', '');
        const errorMessage = validationResult?.join('');
        if (this.messageForPassword && errorMessage) {
          this.messageForPassword.textContent = errorMessage;
        }
      }
    });
  }

  public validationDateOfBirth() {
    this.inputDateOfBirth?.setEventHandler(Events.Input, (value: string) => {
      const validationResult = this.inputDateOfBirth?.validateDateOfBirth(value);
      if (validationResult?.length === 0 && this.messageForDateOfBirth) {
        this.messageForDateOfBirth.textContent = Messages.ValidPDate;
        this.inputDateOfBirth?.removeAttribute('invalid');
      } else if (this.messageForDateOfBirth) {
        this.inputDateOfBirth?.setAttribute('invalid', '');
        const errorMessage = validationResult?.join('');
        if (this.messageForDateOfBirth && errorMessage) {
          this.messageForDateOfBirth.textContent = errorMessage;
        }
      }
    });
  }

  public validationShippingStreet() {
    this.inputShippingAddressStreet?.setEventHandler(Events.Input, (value: string) => {
      const isValid = this.inputShippingAddressStreet?.validateStreet(value);
      if (isValid?.length === 0 && this.messageForShippingAddressStreet) {
        this.messageForShippingAddressStreet.textContent = Messages.ValidStreet;
        this.inputShippingAddressStreet?.removeAttribute('invalid');
      } else if (this.messageForShippingAddressStreet) {
        this.inputShippingAddressStreet?.setAttribute('invalid', '');
        const errorMessage = isValid?.join('');
        if (this.messageForShippingAddressStreet && errorMessage) {
          this.messageForShippingAddressStreet.textContent = errorMessage;
        }
      }
    });
  }
}
