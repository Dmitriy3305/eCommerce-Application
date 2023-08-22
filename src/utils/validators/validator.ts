export default abstract class Validator {
  public validate(value: string, required: boolean): string {
    if (!value.length && required) return 'This field is required';
    return this.validateContent(value);
  }

  protected abstract validateContent(value: string): string;

  protected containsSpecialCharactersOrDigits(value: string): boolean {
    const regex = /[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?0-9]/;
    return regex.test(value);
  }
}
