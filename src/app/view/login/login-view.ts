import loginInputs from './login-inputs.json';
import { InputData } from '../../../types/input-datas';
import toKebabCase from '../../../utils/to-kebab-case';
import FormView from '../form-view';
import { FormFieldsetData } from '../../../types/dom-types/types';

export default class LoginView extends FormView {
  protected get formTitle(): string {
    return 'Login';
  }

  override createInputs(): (InputData | FormFieldsetData)[] {
    const inputs = loginInputs as InputData[];
    inputs.forEach((input) => {
      const currentInput = input;
      currentInput.name = toKebabCase(currentInput.label);
      currentInput.isRequired = true;
    });
    return inputs;
  }
}
