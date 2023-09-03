import { Customer } from '@commercetools/platform-sdk';
import FormComponent from '../../../components/form/form-component';
import profileInputs from './profile-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';
import { InputData, InputDataType } from '../../../types/input-datas';
import Fieldset from '../../../components/form/fieldset-component';
import FormInput from '../../../components/form/form-input-component';
import toKebabCase from '../../../utils/to-kebab-case';
import FormView from '../form-view';
// import UserRepository from '../../api/user';

export default class ProfileView extends FormView {
  protected get formTitle(): string {
    return 'Profile';
  }

  public dataUser?: Customer | undefined;

  private isEditable?: boolean;

  private isDiasbled?: boolean;

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
    form.append(billingAddressCheckbox, billingAddressFieldSet);
    return form;
  }

  override createInputs(): (InputData | FormFieldsetData)[] {
    const inputs = profileInputs as FormFieldsetData[];

    inputs.forEach((fieldset) =>
      fieldset.inputs.forEach((input) => {
        const currentInput = input;
        if (currentInput.label !== 'Apartment') currentInput.isRequired = true;
        currentInput.isDisabled = true;
        currentInput.isEditable = true;
        switch (currentInput.label) {
          case 'First Name': {
            currentInput.value = this.dataUser?.firstName;
            break;
          }
          case 'Last Name': {
            currentInput.value = this.dataUser?.lastName;
            break;
          }
          case 'Birth Date': {
            currentInput.value = this.dataUser?.dateOfBirth;
            break;
          }
          case 'Email': {
            currentInput.value = this.dataUser?.email;
            break;
          }
          case 'Password': {
            currentInput.value = this.dataUser?.password;
            break;
          }
          default:
            currentInput.value = '';
            break;
        }
        currentInput.name = toKebabCase(currentInput.label);
      })
    );
    return inputs;
  }
}
