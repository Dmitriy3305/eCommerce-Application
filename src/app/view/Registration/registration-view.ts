import FormComponent from '../../../components/form/form-component';
import registrationInputs from './registration-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';
import { InputData, InputDataType } from '../../../types/input-datas';
import Fieldset from '../../../components/form/fieldset-component';
import FormInput from '../../../components/form/form-input-component';
import toKebabCase from '../../../utils/to-kebab-case';
import FormView from '../form-view';
import RoutedLink from '../../../components/routed-link';
import { AppLink } from '../../router/router-types';

export default class RegistrationView extends FormView {
  protected get formTitle(): string {
    return 'Registration';
  }

  override createForm(): FormComponent {
    const form = super.createForm();
    form.setAttribute('novalidate', '');

    const billingAddressTemplate = structuredClone(this.createInputs()[1]) as FormFieldsetData;
    billingAddressTemplate.title = 'Billing Address';
    const billingAddressFieldSet = new Fieldset(billingAddressTemplate);

    const checkboxLabel = 'Billing Address is the same as Shipping Address';
    const billingAddressCheckbox = new FormInput({
      label: checkboxLabel,
      dataType: InputDataType.Toggle,
      name: toKebabCase(checkboxLabel),
    });
    billingAddressCheckbox.addInputListener((value: string) => {
      if (value === 'false') form?.append(billingAddressFieldSet);
      else form?.removeFormElement(billingAddressFieldSet);
    });

    const loginLink = new RoutedLink(
      {
        textContent: 'Already have an account? Login here',
      },
      AppLink.Login,
      this.router
    );
    form.append(billingAddressCheckbox, billingAddressFieldSet);
    form.prepend(loginLink);
    return form;
  }

  override createInputs(): (InputData | FormFieldsetData)[] {
    const inputs = registrationInputs as FormFieldsetData[];
    inputs.forEach((fieldset) =>
      fieldset.inputs.forEach((input) => {
        const currentInput = input;
        if (currentInput.label !== 'Apartment') currentInput.isRequired = true;
        currentInput.name = toKebabCase(currentInput.label);
      })
    );
    return inputs;
  }
}
