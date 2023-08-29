import Validator from './validator';

export default class NameValidator extends Validator {
  override validateContent(firstName: string): string {
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!nameRegex.test(firstName)) return 'The name should consist only of letters';
    return '';
  }
}
