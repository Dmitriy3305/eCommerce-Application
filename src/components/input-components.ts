import DOMComponent, { ElementParameters } from './base-component';
import { Tags } from '../types/dom-types/enums';

export default class InputDomComponents extends DOMComponent<HTMLInputElement> {
  public constructor(params: Omit<ElementParameters, 'tag'>) {
    super({
      tag: Tags.Input,
      ...params,
    });
  }

  public get value(): string {
    return this.element.value;
  }

  public validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  }

  public get validityMessage(): string {
    return String(this.element.validationMessage);
  }

  public validatePassword(password: string): string[] {
    const errors: string[] = [];
    // Password should be at least 8 characters
    if (password.length < 8) {
      errors.length = 0;
      errors.push('Password should be at least 8 characters');
    }

    // Password should contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.length = 0;
      errors.push('Password should contain at least one uppercase letter');
    }

    // Password should contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.length = 0;
      errors.push('Password should contain at least one lowercase letter');
    }

    // Password should contain at least one digit
    if (!/\d/.test(password)) {
      errors.length = 0;
      errors.push('Password should contain at least one digit');
    }

    // Password can contain a special character (optional)
    if (!/[!@#$%^&*]/.test(password)) {
      errors.length = 0;
      errors.push('Password can contain a special character');
    }

    // Password should not have leading or trailing spaces
    if (password.trim() !== password) {
      errors.length = 0;
      errors.push('Password must not contain leading or trailing whitespace');
    }
    return errors;
  }

  public setEventHandler(event: string, callback: (value: string) => void) {
    this.element.addEventListener(event, () => {
      callback(this.element.value);
    });
  }
}
