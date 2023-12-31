import Validator from './validator';

export default class NonSpecialCharactersValidator extends Validator {
  override validateContent(appartment: string): string {
    const appartmentRegex = /^(\w| )+$/;
    if (!appartmentRegex.test(appartment)) return 'This field shoud not contain special characters';
    return '';
  }
}
