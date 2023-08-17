import DOMComponent from './base-component';
import { Tags } from '../types/dom-types/enums';
import AppView from '../app/view/view';
import InputDomComponents from './input-components';

export default class LoginMainView extends AppView {
  public inputEmail!: InputDomComponents;

  public inputPassword!: InputDomComponents;

  public messageField!: DOMComponent<HTMLSpanElement>;

  public btnShowPassword!: DOMComponent<HTMLButtonElement>;

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
      parent: main,
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
      parent: loginForm,
    });

    this.inputEmail = new InputDomComponents({
      attributes: {
        id: 'input-email',
        type: 'email',
        placeholder: 'Email',
      },
      parent: loginForm,
    });

    this.messageField = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-field'],
      parent: loginForm,
      textContent: ' ',
    });

    const labelPassword = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-password'],
      attributes: { for: 'input-password' },
      parent: loginForm,
    });

    const inputPasswordContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: ['input-password-container'],
      parent: loginForm
    })

    this.inputPassword = new InputDomComponents({
      attributes: { id: 'input-password', type: 'password', placeholder: 'Password' },
      parent: inputPasswordContainer,
    });

    this.btnShowPassword = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['btn-show-password'],
      parent: inputPasswordContainer,
    })

    const loginButton = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['sign-in'],
      textContent: 'Sign in',
      parent: loginForm,
    });

    return main;
  }
}
