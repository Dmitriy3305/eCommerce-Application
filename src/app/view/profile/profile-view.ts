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

enum UserField {
  FirstName = 'First Name',
  LastName = 'Last Name',
  BirthDate = 'Birth Date',
  Email = 'Email',
  Password = 'Password',
  Country = 'Country',
  City = 'City',
  Street = 'Street',
  Building = 'Building',
  Apartment = 'Apartment',
  PostalCode = 'Postal Code',
}

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
        console.log(fieldset.title);
        const currentInput = input;
        if (currentInput.label !== 'Apartment') currentInput.isRequired = true;
        currentInput.isDisabled = true;
        currentInput.isEditable = true;
        type LabelToValueMapType = {
          [label: string]: () => string | undefined;
        };
        const labelToValueMap: LabelToValueMapType = {
          [UserField.FirstName]: () => this.dataUser?.firstName,
          [UserField.LastName]: () => this.dataUser?.lastName,
          [UserField.BirthDate]: () => this.dataUser?.dateOfBirth,
          [UserField.Email]: () => this.dataUser?.email,
          [UserField.Password]: () => this.dataUser?.password,
          [UserField.Country]: () => this.dataUser?.addresses[0].country,
          [UserField.City]: () => this.dataUser?.addresses[0].city,
          [UserField.Street]: () => this.dataUser?.addresses[0].streetName,
          [UserField.Building]: () => this.dataUser?.addresses[0].building,
          [UserField.Apartment]: () => this.dataUser?.addresses[0].apartment,
          [UserField.PostalCode]: () => this.dataUser?.addresses[0].postalCode,
        };

        const matchFunc = labelToValueMap[currentInput.label];
        currentInput.value = matchFunc ? matchFunc() : '';
      })
    );
    return inputs;
  }
}