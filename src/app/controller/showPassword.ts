import DOMComponent from '../../components/base-component';
import { Events } from '../../types/dom-types/enums';
import InputDomComponents from '../../components/input-component';

export default class PasswordShow {
  private inputPassword: InputDomComponents;

  private btnShowPassword: DOMComponent<HTMLButtonElement>;

  constructor(inputPassword: InputDomComponents, btnShowPassword: DOMComponent<HTMLButtonElement>) {
    this.inputPassword = inputPassword;
    this.btnShowPassword = btnShowPassword;
  }

  togglePasswordVisibility() {
    this.btnShowPassword.addEventListener(Events.Click, (event) => {
      event.preventDefault();
      if (this.inputPassword.getAttribute('type') === 'password') {
        this.btnShowPassword.removeClass('btn-show-password-hide');
        this.btnShowPassword.addClass('btn-show-password-visible');
        this.inputPassword.setAttribute('type', 'text');
      } else {
        this.inputPassword.setAttribute('type', 'password');
        this.btnShowPassword.removeClass('btn-show-password-visible');
        this.btnShowPassword.addClass('btn-show-password-hide');
      }
    });
  }
}
