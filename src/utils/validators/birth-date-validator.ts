import Validator from './validator';

export default class BirthDateValidator extends Validator {
  protected override validateContent(value: string): string {
    const minimumAge = 13;
    const currentDate = new Date();
    const selectedDate = new Date(value);
    const minimumDate = new Date();
    minimumDate.setFullYear(currentDate.getFullYear() - minimumAge);

    if (selectedDate > currentDate) return 'A future date has been selected';
    if (selectedDate > minimumDate) return `You must be over ${minimumAge} years old`;
    return '';
  }
}
