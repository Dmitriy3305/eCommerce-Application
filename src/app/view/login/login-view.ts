import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import loginInputs from './login-inputs.json';
import AppView from '../view';
import FormComponent from '../../../components/form/form-component';
import { InputData, InputDataType } from '../../../types/input-datas';
import ValidationCallback from '../../../types/validation-callback';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';

export default class LoginView extends AppView {
  private static FORM_TITLE = 'Login';

  private form?: FormComponent;

  public constructor(
    router: AppRouter,
    appName: string,
    appDescription: string,
    categories: GrouppedCategories,
    validationCallbacks: Map<InputDataType, ValidationCallback>
  ) {
    super(router, appName, appDescription, categories);
    this.form?.addValidation(validationCallbacks);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    const inputs = loginInputs as InputData[];
    inputs.forEach((input) => {
      const currentInput = input;
      currentInput.isRequired = true;
    });

    this.form = new FormComponent({
      inputs,
      onSubmit: () => {},
      title: LoginView.FORM_TITLE,
    });

    main.append(this.form);

    return main;
  }
}
