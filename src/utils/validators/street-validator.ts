import Validator from './validator';

export default class StreetValidator extends Validator {
  protected override validateContent(): string {
    return '';
  }
}
