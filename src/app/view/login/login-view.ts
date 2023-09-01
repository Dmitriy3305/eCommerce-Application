import loginInputs from './login-inputs.json';
import { InputData } from '../../../types/input-datas';
import toKebabCase from '../../../utils/to-kebab-case';
import FormView from '../form-view';
import { FormFieldsetData } from '../../../types/dom-types/types';
import FormComponent from '../../../components/form/form-component';
import RoutedLink from '../../../components/routed-link';
import { AppLink } from '../../router/router-types';

export default class LoginView extends FormView {
  protected get formTitle(): string {
    return 'Login';
  }

  protected override createForm(): FormComponent {
    const form = super.createForm();
    const registerLink = new RoutedLink(
      {
        textContent: "Don't have an account? Sign up",
      },
      AppLink.Register,
      this.router
    );
    form.append(registerLink);
    return form;
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
