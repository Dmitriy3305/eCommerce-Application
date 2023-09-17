import { Customer } from '@commercetools/platform-sdk';
import FormComponent from '../../../components/form/form-component';
import profileInputs from './profile-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';
import { InputData } from '../../../types/input-datas';
import Fieldset from '../../../components/form/fieldset-component';
import FormView from '../form-view';
import { AppInfo, AuthorizationParameters, FormParameters } from '../../../types/app-parameters';
import { GrouppedCategories } from '../../api/products';
import AppRouter from '../../router/router';

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
  private dataUser: Customer | undefined;

  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    formParams: FormParameters,
    dataUser: Customer
  ) {
    super(router, appInfo, categories, authParams, formParams);
    this.dataUser = dataUser;
  }

  protected get formTitle(): string {
    return 'Profile';
  }

  override createForm(): FormComponent {
    const form = super.createForm();
    form.setAttribute('novalidate', '');
    const billingAddressTemplate = structuredClone(this.createInputs()[1]) as FormFieldsetData;
    billingAddressTemplate.title = 'Billing Address';
    const billingAddressFieldSet = new Fieldset(billingAddressTemplate);
    form.append(billingAddressFieldSet);
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
        const labelToValueMap: { [label: string]: string | undefined } = {
          [UserField.FirstName]: this.dataUser?.firstName,
          [UserField.LastName]: this.dataUser?.lastName,
          [UserField.BirthDate]: this.dataUser?.dateOfBirth,
          [UserField.Email]: this.dataUser?.email,
          [UserField.Password]: this.dataUser?.password,
          [UserField.Country]: this.dataUser?.addresses[0].country,
          [UserField.City]: this.dataUser?.addresses[0].city,
          [UserField.Street]: this.dataUser?.addresses[0].streetName,
          [UserField.Building]: this.dataUser?.addresses[0].building,
          [UserField.Apartment]: this.dataUser?.addresses[0].apartment,
          [UserField.PostalCode]: this.dataUser?.addresses[0].postalCode,
        };
        currentInput.value = labelToValueMap[currentInput.label] || '';
      })
    );
    return inputs;
  }
}
