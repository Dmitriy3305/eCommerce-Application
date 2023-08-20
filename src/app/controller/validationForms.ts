import DOMComponent from '../../components/base-component';
import { Events } from '../../types/dom-types/enums';
import InputDomComponents from '../../components/input-components';

const enum Messages {
  NotValidEmail = 'Please enter a valid email',
  ValidEmail = 'Your email is valid',
  ValidPassword = 'Your password is valid',
}

export default class ValidationInput {
  constructor(
    public inputEmail?: InputDomComponents,
    public inputPassword?: InputDomComponents,
    public messageForEmail?: DOMComponent<HTMLSpanElement>,
    public messageForPassword?: DOMComponent<HTMLSpanElement>,
    public inputDateOfBirth?: InputDomComponents,
    public messageForDateOfBirth?: DOMComponent<HTMLSpanElement>,
    public inputFirstName?: InputDomComponents,
    public messageForFirstName?: DOMComponent<HTMLSpanElement>,
    public inputLastName?: InputDomComponents,
    public messageForLastName?: DOMComponent<HTMLSpanElement>,
    public inputShippingAddressCounty?: string
  ) {}

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
}
