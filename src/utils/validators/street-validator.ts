import Validator from './validator';

export default class StreetValidator extends Validator {
  protected override validateContent(street: string): string {
    if (street.length === 0) return 'The street must contain at least 1 character';
    return '';
  }
}
