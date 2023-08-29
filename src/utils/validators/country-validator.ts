import Validator from './validator';

export default class CountryValidator extends Validator {
  protected override validateContent(): string {
    return '';
  }
}
