import DOMComponent from '../../components/base-component';
import { Events, Tags } from '../../types/dom-types/enums';
import AppView from './view';
import InputDomComponents from '../../components/input-components';
import ValidationInput from '../controller/validationForms';
import PasswordShow from '../controller/showPassword';

export default class LoginView extends AppView {
  public inputEmail!: InputDomComponents;

  public inputPassword!: InputDomComponents;

  public messageForEmail!: DOMComponent<HTMLSpanElement>;

  public btnShowPassword!: DOMComponent<HTMLButtonElement>;

  public messageForPassword!: DOMComponent<HTMLSpanElement>;

  public get pageName(): string {
    return 'main-login';
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    const title = new DOMComponent<HTMLElement>({
      tag: Tags.Heading1,
      classList: ['title'],
      textContent: 'Login',
    });

    const loginForm = new DOMComponent<HTMLFormElement>({
      tag: Tags.Form,
      classList: ['form'],
      parent: main,
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
      parent: loginForm,
    });

    this.messageForEmail = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-email'],
      parent: loginForm,
      textContent: ' ',
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
      parent: loginForm,
      textContent: ' ',
    });

    this.btnShowPassword = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['btn-show-password-hide'],
      parent: inputPasswordContainer,
    });

    const loginButton = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['sign-in'],
      textContent: 'Sign in',
      parent: loginForm,
    });

    loginForm.append(
      labelEmail,
      this.inputEmail,
      this.messageForEmail,
      inputPasswordContainer,
      this.messageForPassword,
      loginButton
    );
    inputPasswordContainer.append(labelPassword, this.inputPassword, this.btnShowPassword);
    main.append(title, loginForm);
    const validationInput = new ValidationInput(
      this.inputEmail,
      this.messageForEmail,
      this.inputPassword,
      this.messageForPassword
    );
    validationInput.validationEmail();
    validationInput.validationPassword();
    const passwordShow = new PasswordShow(this.inputPassword, this.btnShowPassword);
    passwordShow.togglePasswordVisibility();
    return main;
  }
}
