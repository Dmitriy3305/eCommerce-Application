import { Customer } from '@commercetools/platform-sdk';
import FormComponent from '../../../components/form/form-component';
import profileInputs from './profile-inputs.json';
import { FormFieldsetData } from '../../../types/dom-types/types';
import { InputData, InputValues } from '../../../types/input-datas';
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
  public constructor(
    router: AppRouter,
    appInfo: AppInfo,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters,
    formParams: FormParameters,
    user: Customer
  ) {
    const formParameters = formParams;
    formParameters.inputValues = {
      [UserField.FirstName]: user.firstName,
      [UserField.LastName]: user.lastName,
      [UserField.BirthDate]: user.dateOfBirth,
      [UserField.Email]: user.email,
      [UserField.Password]: user.password,
      [UserField.Country]: user.addresses[0].country,
      [UserField.City]: user.addresses[0].city,
      [UserField.Street]: user.addresses[0].streetName,
      [UserField.Building]: user.addresses[0].building,
      [UserField.Apartment]: user.addresses[0].apartment,
      [UserField.PostalCode]: user.addresses[0].postalCode,
    };
    super(router, appInfo, categories, authParams, formParameters);
  }

  protected get formTitle(): string {
    return 'Profile';
  }

  override createForm(inputValues: InputValues): FormComponent {
    const form = super.createForm(inputValues);
    const billingAddressTemplate = structuredClone(this.createInputs(inputValues)[1]) as FormFieldsetData;
    billingAddressTemplate.title = 'Billing Address';
    const billingAddressFieldSet = new Fieldset(billingAddressTemplate);
    form.append(billingAddressFieldSet);
    return form;
  }

  override createInputs(inputValues: InputValues): (InputData | FormFieldsetData)[] {
    const inputs = profileInputs as FormFieldsetData[];
    inputs.forEach((fieldset) =>
      fieldset.inputs.forEach((input) => {
        const currentInput = input;
        if (currentInput.label !== 'Apartment') currentInput.isRequired = true;
        currentInput.isDisabled = true;
        currentInput.isEditable = true;

        currentInput.value = inputValues[currentInput.label] || '';
      })
    );
    return inputs;
  }
}
