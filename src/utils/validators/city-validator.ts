import Validator from './validator';

export default class CityValidator extends Validator {
  override validateContent(city: string): string {
    const cityRegex = /^[a-zA-Zа-яА-Я]+$/;
    if (!cityRegex.test(city)) return 'The city should consist only of letters';
    return '';
  }
}
