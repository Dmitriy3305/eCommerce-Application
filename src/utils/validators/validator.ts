export default abstract class Validator {
  public validate(value: string, required: boolean): string {
    if (!value.length && required) return 'This field is required';
    return this.validateContent(value);
  }

  protected abstract validateContent(value: string): string;
}
