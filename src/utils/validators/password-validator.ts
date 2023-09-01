import Validator from './validator';

export default class PasswordValidator extends Validator {
  protected override validateContent(password: string): string {
    if (password.length < 8) return 'Password should be at least 8 characters';
    if (!/[A-Z]/.test(password)) return 'Password should contain uppercase letters';
    if (!/[a-z]/.test(password)) return 'Password should contain lowercase letters';
    if (!/\d/.test(password)) return 'Password should contain at least one digit';
    if (!/[!@#$%^&*]/.test(password)) return 'The password must contain a special character';
    if (password.trim() !== password) return 'Password must not contain leading or trailing whitespace';
    return '';
  }
}
