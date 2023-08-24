import Validator from './validator';

export default class AppartmentValidator extends Validator {
  override validateContent(appartment: string): string {
    const appartmentRegex = /^[a-zA-Zа-яА-Я\d]+\/[a-zA-Zа-яА-Я\d]+$/;
    if (!appartmentRegex.test(appartment)) return 'Follow the template: building/appartment';
    return '';
  }
}
