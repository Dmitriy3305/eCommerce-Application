import Validator from './validator';

export default class OnlyLettersValidator extends Validator {
  override validateContent(firstName: string): string {
    const nameRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!nameRegex.test(firstName)) return 'This field should consist only of letters';
    return '';
  }
}
