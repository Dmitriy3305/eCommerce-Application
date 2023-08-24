import Validator from './validator';

export default class PostalCodeValidator extends Validator {
  countryPostalCodes: { Russia: RegExp; UnitedKingdom: RegExp; UnitedStates: RegExp };

  constructor() {
    super();
    this.countryPostalCodes = {
      Russia: /^\d{5}$/,
      UnitedKingdom: /[A-Z]\d[A-Z\d]??\s*\d[A-Z]{2}$/,
      UnitedStates: /^\d{5}(?:[-\s]\d{4})?$/,
    };
  }

  protected validateContent(value: string): string {
    console.log(value);
    return '';
  }
}
