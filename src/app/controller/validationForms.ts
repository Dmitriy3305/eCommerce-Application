import DOMComponent from '../../components/base-component';
import { Events, Tags } from '../../types/dom-types/enums';
import InputDomComponents from '../../components/input-components';

export default class ValidationInput {
  public inputEmail: InputDomComponents;

  public messageField: DOMComponent<HTMLElement>;

  public inputPassword: InputDomComponents;

  constructor() {
    this.inputEmail = new InputDomComponents({
      attributes: {
        id: 'input-email',
        type: 'email',
        placeholder: 'Email',
      },
    });
    this.messageField = new DOMComponent<HTMLElement>({
      classList: ['message-field'],
      textContent: ' ',
    });
    
    this.inputPassword = new InputDomComponents({ classList: ['input-password'] });
  }
  
  public validationEmail() {
    console.log(this.inputEmail, this.messageField, this.inputPassword)
    this.inputEmail?.setEventHandler(Events.Input, (value: string) => {
      console.log('Event.Input:', Events.Input);
      const isValid = this.inputEmail?.validateEmail(value);
      console.log(isValid);
      if (isValid && this.messageField) {
        console.log('valid');
        this.messageField.addText('valid');
      } else if (this.messageField) {
        this.messageField.addText('valid');
        this.inputEmail?.setAttribute('invalid', '');
      }
    });
  }

  public validationPassword() {
    this.inputPassword?.setEventHandler(Events.Input, (value: string) => {
      const validationResult = this.inputPassword?.validatePassword(value);
      if (validationResult?.length === 0) {
        console.log('valid');
        if (this.messageField) {
          this.messageField.textContent = 'valid';
          this.inputPassword?.removeAttribute('invalid');
        }
      } else if (this.messageField) {
        console.log('not valid');

        this.messageField.textContent = 'not-valid';
        this.inputPassword?.setAttribute('invalid', '');

        const errorMessage = validationResult?.join('');
        if (this.messageField && errorMessage) {
          this.messageField.textContent = errorMessage;
        }
      }
    });
  }
}

const validationForm = new ValidationInput();
validationForm.validationEmail();
validationForm.validationPassword();
