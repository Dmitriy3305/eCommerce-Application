import Validator from './validator';

export enum Countries {
  Russia = 'Russia',
  UnitedKingdom = 'United Kingdom',
  UnitedStates = 'United States',
}

export default class PostalCodeValidator extends Validator {
  private static countryPostalCodes = {
    [Countries.Russia]: /^\d{5}$/,
    [Countries.UnitedKingdom]: /[A-Z]\d[A-Z\d]??\s*\d[A-Z]{2}$/,
    [Countries.UnitedStates]: /^\d{5}(?:[-\s]\d{4})?$/,
  };

  private country: Countries;

  constructor(country: Countries) {
    super();
    this.country = country;
  }

  protected validateContent(value: string): string {
    const regex: RegExp = PostalCodeValidator.countryPostalCodes[this.country];
    if (!regex.test(value)) {
      return 'Invalid postal code';
    }
    return '';
  }
}
