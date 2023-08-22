import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import loginInputs from './login-inputs.json';
import AppView from '../view';
import { FormFieldsetData, InputData } from '../../../types/dom-types/types';
import FormComponent from '../../../components/form/form-component';

export default class LoginView extends AppView {
  private static FORM_TITLE = 'Login';

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    const inputs = loginInputs as (InputData | FormFieldsetData)[];

    main.append(
      new FormComponent({
        inputs,
        onSubmit: () => {},
        title: LoginView.FORM_TITLE,
      })
    );

    return main;
  }
}
