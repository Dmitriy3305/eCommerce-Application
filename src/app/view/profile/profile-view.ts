import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import FormComponent from '../../../components/form/form-component';
import registrationInputs from '../Registration/registration-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';
import { InputDataType } from '../../../types/input-datas';
import ValidationCallback from '../../../types/validation-callback';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import Fieldset from '../../../components/form/fieldset-component';
import FormInput from '../../../components/form/form-input-component';
import toKebabCase from '../../../utils/to-kebab-case';

export default class ProfileView extends AppView {
  private static FORM_TITLE = 'Profile';

  private form?: FormComponent;

  public constructor(
    router: AppRouter,
    appName: string,
    appDescription: string,
    categories: GrouppedCategories,
    validationCallbacks: Map<InputDataType, ValidationCallback>,
    countries: string[]
  ) {
    super(router, appName, appDescription, categories);
    this.form?.addOptions(InputDataType.Country, countries);
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
        currentInput.name = toKebabCase(currentInput.label);
        currentInput.value = '';
        currentInput.isDisabled = true;
      })
    );

    this.form = new FormComponent({
      inputs,
      onSubmit() {},
      title: ProfileView.FORM_TITLE,
    });

    const billingAddressTemplate = structuredClone(inputs[1]);
    billingAddressTemplate.title = 'Billing Address';
    const billingAddressFieldSet = new Fieldset(billingAddressTemplate);
    const billingAddressCheckbox = new FormInput({
      label: 'Billing Address is the same as Shipping Address',
      dataType: InputDataType.Toggle,
    });
    billingAddressCheckbox.addInputListener((value: string) => {
      if (value === 'false') this.form?.append(billingAddressFieldSet);
      else this.form?.removeFormElement(billingAddressFieldSet);
    });

    this.form.append(billingAddressCheckbox, billingAddressFieldSet);
    main.append(this.form);
    return main;
  }
}
