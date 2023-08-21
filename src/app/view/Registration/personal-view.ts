import DOMComponent from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import InputDomComponents from '../../../components/input-components';

export default class PersonalView {
  public personal!: DOMComponent<HTMLDivElement>;

  public inputFirstName!: InputDomComponents;

  public messageForFirstName!: DOMComponent<HTMLSpanElement>;

  public inputLastName!: InputDomComponents;

  public messageForLastName!: DOMComponent<HTMLSpanElement>;

  public inputEmail!: InputDomComponents;

  public messageForEmail!: DOMComponent<HTMLSpanElement>;

  public inputPassword!: InputDomComponents;

  public messageForPassword!: DOMComponent<HTMLSpanElement>;

  public inputDateOfBirth!: InputDomComponents;

  public messageForDateOfBirth!: DOMComponent<HTMLSpanElement>;

  public btnShowPassword!: DOMComponent<HTMLButtonElement>;

  constructor() {
    this.inputFirstName = new InputDomComponents({});
    this.messageForFirstName = new DOMComponent<HTMLSpanElement>({});
    this.inputLastName = new InputDomComponents({});
    this.messageForLastName = new DOMComponent<HTMLSpanElement>({});
    this.inputEmail = new InputDomComponents({});
    this.messageForEmail = new DOMComponent<HTMLSpanElement>({});
    this.inputPassword = new InputDomComponents({});
    this.messageForPassword = new DOMComponent<HTMLSpanElement>({});
    this.btnShowPassword = new DOMComponent<HTMLButtonElement>({});
    this.inputDateOfBirth = new InputDomComponents({});
    this.messageForDateOfBirth = new DOMComponent<HTMLSpanElement>({});
    this.btnShowPassword = new DOMComponent<HTMLButtonElement>({});
  }

  public create(): DOMComponent<HTMLElement> {
    this.personal = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: ['personal'],
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
        placeholder: 'Date of birth',
        addEventListener: Events.Input,
        required: '',
      },
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
    });

    this.messageForEmail = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-email'],
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
    });

    this.btnShowPassword = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: ['btn-show-password-hide'],
    });

    this.messageForPassword = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: ['message-for-password'],
      textContent: 'this field is mandatory',
    });

    inputPasswordContainer.append(labelPassword, this.inputPassword, this.btnShowPassword);

    this.personal.append(
      labelFirstName,
      this.inputFirstName,
      this.messageForFirstName,
      labelLastName,
      this.inputLastName,
      this.messageForLastName,
      labelEmail,
      this.inputEmail,
      this.messageForEmail,
      labelPassword,
      inputPasswordContainer,
      this.messageForPassword,
      labelDateOfBirth,
      this.inputDateOfBirth,
      this.messageForDateOfBirth
    );
    return this.personal;
  }
}
