import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import FormComponent from '../../../components/form/form-component';
import registrationInputs from './registration-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';
import { InputDataType } from '../../../types/input-datas';
import ValidationCallback from '../../../types/validation-callback';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';

export default class RegistrationView extends AppView {
  private static FORM_TITLE = 'Registration';

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
    const inputs = registrationInputs as FormFieldsetData[];
    inputs.forEach((fieldset) =>
      fieldset.inputs.forEach((input) => {
        const currentInput = input;
        currentInput.isRequired = true;
      })
    );
    if (inputs.length === 2)
      inputs.push({
        title: 'Billing Address',
        inputs: inputs[1].inputs,
      });
    this.form = new FormComponent({
      inputs,
      onSubmit() {},
      title: RegistrationView.FORM_TITLE,
    });

    main.append(this.form);
    return main;
  }
}
