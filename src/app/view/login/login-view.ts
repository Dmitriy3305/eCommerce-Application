import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import loginInputs from './login-inputs.json';
import AppView from '../view';
import FormComponent, { FormSubmitCallback } from '../../../components/form/form-component';
import { InputData, InputDataType } from '../../../types/input-datas';
import ValidationCallback from '../../../types/validation-callback';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import toKebabCase from '../../../utils/to-kebab-case';
import { showErrorToastify, showSuccessToastify } from '../../../utils/toastify';
import { AppLink } from '../../router/router-types';

export default class LoginView extends AppView {
  private static FORM_TITLE = 'Login';

  private form?: FormComponent;

  public constructor(
    router: AppRouter,
    appName: string,
    appDescription: string,
    categories: GrouppedCategories,
    validationCallbacks: Map<InputDataType, ValidationCallback>,
    submitCallback: FormSubmitCallback
  ) {
    super(router, appName, appDescription, categories);
    this.form?.addValidation(validationCallbacks);
    this.form?.addSubmitCallback(async (data) => {
      try {
        await submitCallback(data);
        showSuccessToastify('Logged in successfully');
        this.router.navigate(AppLink.Main);
      } catch (error) {
        showErrorToastify((error as Error).message);
      }
    });
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });

    const inputs = loginInputs as InputData[];
    inputs.forEach((input) => {
      const currentInput = input;
      currentInput.name = toKebabCase(currentInput.label);
      currentInput.isRequired = true;
    });

    this.form = new FormComponent({
      inputs,
      title: LoginView.FORM_TITLE,
    });

    main.append(this.form);

    return main;
  }
}
