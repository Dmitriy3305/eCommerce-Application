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

  public validatePassword(password: string): string[] {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.length = 0;
      errors.push('Password should be at least 8 characters');
    }

    if (!/[A-Z]/.test(password)) {
      errors.length = 0;
      errors.push('Password should contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.length = 0;
      errors.push('Password should contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
      errors.length = 0;
      errors.push('Password should contain at least one digit');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.length = 0;
      errors.push('The password must contain a special character');
    }

    if (password.trim() !== password) {
      errors.length = 0;
      errors.push('Password must not contain leading or trailing whitespace');
    }
    return errors;
  }

  public containsSpecialCharactersOrDigits(value: string) {
    const regex = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?0-9]/;
    return regex.test(value);
  }

  public setEventHandler(event: string, callback: (value: string) => void) {
    this.element.addEventListener(event, () => {
      callback(this.element.value);
    });
  }

  public getAttribute(attributeName: string) {
    return this.element.getAttribute(attributeName);
  }
}
