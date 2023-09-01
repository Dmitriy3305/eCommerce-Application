import DOMComponent from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import FormComponent, { FormSubmitCallback } from '../../../components/form/form-component';
import registrationInputs from './registration-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';
import { InputDataType } from '../../../types/input-datas';
import ValidationCallback from '../../../types/validation-callback';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';
import Fieldset from '../../../components/form/fieldset-component';
import FormInput from '../../../components/form/form-input-component';
import toKebabCase from '../../../utils/to-kebab-case';

export default class RegistrationView extends AppView {
  private static FORM_TITLE = 'Registration';

  private form?: FormComponent;

  public constructor(
    router: AppRouter,
    appName: string,
    appDescription: string,
    categories: GrouppedCategories,
    isAuthorized: boolean,
    logoutCallback: () => void,
    validationCallbacks: Map<InputDataType, ValidationCallback>,
    countries: string[],
    submitCallback: FormSubmitCallback
  ) {
    super(router, appName, appDescription, categories, isAuthorized, logoutCallback);
    this.form?.addOptions(InputDataType.Country, countries);
    this.form?.addValidation(validationCallbacks);

    this.form?.addSubmitCallback(submitCallback);
  }

  protected createMain(): DOMComponent<HTMLElement> {
    const main = new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
    const inputs = registrationInputs as FormFieldsetData[];
    inputs.forEach((fieldset) =>
      fieldset.inputs.forEach((input) => {
        const currentInput = input;
        if (currentInput.label !== 'Apartment') currentInput.isRequired = true;
        currentInput.name = toKebabCase(currentInput.label);
      })
    );

    this.form = new FormComponent({
      inputs,
      title: RegistrationView.FORM_TITLE,
    });
    this.form.setAttribute('novalidate', '');

    const billingAddressTemplate = structuredClone(inputs[1]);
    billingAddressTemplate.title = 'Billing Address';
    const billingAddressFieldSet = new Fieldset(billingAddressTemplate);

    const checkboxLabel = 'Billing Address is the same as Shipping Address';
    const billingAddressCheckbox = new FormInput({
      label: checkboxLabel,
      dataType: InputDataType.Toggle,
      name: toKebabCase(checkboxLabel),
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
