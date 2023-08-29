import Validator from './validator';

export default class EmailValidator extends Validator {
  protected override validateContent(value: string): string {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(value)) return 'Your email is not valid';
    return '';
  }
}
