import Validator from './validator';

export default class StreetValidator extends Validator {
  protected override validateContent(street: string): string {
    const regex = /[!@#$%^&*()_+\-=\\[\]{};':"|,<>/?]/;
    if (regex.test(street)) return 'The street should not contain special characters.';
    return '';
  }
}
