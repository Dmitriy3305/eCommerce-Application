import DOMComponent from './base-component';
import { Tags } from '../types/dom-types/enums';
import AppView from '../app/view/view';

export default class LoginMainView extends AppView {
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

    const inputEmail = new DOMComponent<HTMLInputElement>({
      tag: Tags.Input,
      attributes: { id: 'input-email', type: 'text', placeholder: 'Email' },
      parent: loginForm,
    });

    const labelPassword = new DOMComponent<HTMLLabelElement>({
      tag: Tags.Label,
      classList: ['label-password'],
      attributes: { for: 'input-password' },
      parent: loginForm,
    });

    const inputPassword = new DOMComponent<HTMLInputElement>({
      tag: Tags.Input,
      attributes: { id: 'input-password', type: 'password', placeholder: 'Password' },
      parent: loginForm,
    });

    const loginButton = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['sign-in'],
      textContent: 'Sign in',
      parent: loginForm,
    });
    loginForm.append(labelEmail, inputEmail, labelPassword, inputPassword, loginButton);
    main.append(title, loginForm);

    return main;
  }
}
