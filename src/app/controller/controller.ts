import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import ProductsRepository, { GrouppedCategories } from '../api/products';
import { InputDataType } from '../../types/input-datas';
import ValidationCallback from '../../types/validation-callback';
import NameValidator from '../../utils/validators/name-validator';
import Validator from '../../utils/validators/validator';
import BirthDateValidator from '../../utils/validators/birth-date-validator';
import CityValidator from '../../utils/validators/city-validator';
import EmailValidator from '../../utils/validators/email-validator';
import PasswordValidator from '../../utils/validators/password-validator';
import AppartmentValidator from '../../utils/validators/appartment-validator';
import PostalCodeValidator, { Countries } from '../../utils/validators/postalCode-validator';
import ProjectSettingsRepository from '../api/project';
import StreetValidator from '../../utils/validators/street-validator';
import CountryValidator from '../../utils/validators/country-validator';
import { FieldsetSubmitData } from '../../components/form/form-component';
import { InputSubmitData } from '../../components/form/form-input-component';
import createFromFieldset from '../../utils/create-client';
import getCountryCode from '../../utils/country-code';
import UserRepository from '../api/user';

export default class AppController {
  private products: ProductsRepository;

  private authManager: UserRepository;

  private projectSettings: ProjectSettingsRepository;

  public constructor() {
    this.products = new ProductsRepository();
    this.projectSettings = new ProjectSettingsRepository();
    this.authManager = new UserRepository();
  }

  public authorizeSavedUser(): void {
    this.authManager.checkToken();
  }

  public get isAuthorized(): boolean {
    return this.authManager.user !== null;
  }

  public async authorize(loginFormData: (InputSubmitData | FieldsetSubmitData)[]) {
    const [email, password] = (loginFormData as InputSubmitData[]).map((data) => data.value);
    await this.authManager.authorize(email, password);
  }

  public async register(registerFormData: (InputSubmitData | FieldsetSubmitData)[]) {
    const [personalInfo, shippingAddressFieldset, , billingAddressFieldSet] = registerFormData as [
      FieldsetSubmitData,
      FieldsetSubmitData,
      InputSubmitData,
      FieldsetSubmitData,
    ];
    const customer = createFromFieldset<CustomerDraft>(personalInfo);
    Object.defineProperty(customer, 'addresses', { value: [] });

    Object.defineProperty(customer, 'shippingAddresses', { value: [] });
    const shippingAddress = createFromFieldset<BaseAddress>(shippingAddressFieldset);
    Object.defineProperty(shippingAddress, 'country', { value: getCountryCode(shippingAddress.country) });
    const isShippingDefault =
      shippingAddressFieldset.inputs.find((input) => input.name === 'set-as-default')?.value === 'on';

    customer.addresses?.push(shippingAddress);
    customer.shippingAddresses?.push(0);
    if (isShippingDefault) Object.defineProperty(customer, 'defaultShippingAddress', { value: 0 });

    if (billingAddressFieldSet) {
      Object.defineProperty(customer, 'billingAddresses', { value: [] });
      const billingAddress = createFromFieldset<BaseAddress>(billingAddressFieldSet);
      Object.defineProperty(billingAddress, 'country', { value: getCountryCode(billingAddress.country) });

      customer.addresses?.push(billingAddress);
      customer.billingAddresses?.push(1);
      const isBillingDefault =
        billingAddressFieldSet.inputs.find((input) => input.name === 'set-as-default')?.value === 'on';
      if (isBillingDefault) Object.defineProperty(customer, 'defaultBillingAddress', { value: 1 });
    } else if (isShippingDefault) {
      Object.defineProperty(customer, 'defaultBillingAddress', { value: 0 });
    }
    await this.authManager.register(customer);
  }

  public async loadCategories(): Promise<GrouppedCategories> {
    const categories = await this.products.getCategoriesGroups();
    return categories;
  }

  public loadCountries(): Promise<string[]> {
    return this.projectSettings.getCountries();
  }

  public logout(): void {
    this.authManager.logout();
  }

  public getValidationCallbacks(): Map<InputDataType, ValidationCallback> {
    const callbacks = new Map();
    Object.values(InputDataType).forEach((value) => {
      callbacks.set(value, this.getDefaultValidationCallback(value));
    });
    return callbacks;
  }

  private getDefaultValidationCallback(type: InputDataType): ValidationCallback {
    return (value: string, isRequired: boolean, resource?: string) => {
      let validator: Validator;

      switch (type) {
        case InputDataType.Street:
          validator = new StreetValidator();
          break;
        case InputDataType.Password:
          validator = new PasswordValidator();
          break;
        case InputDataType.Email:
          validator = new EmailValidator();
          break;
        case InputDataType.BirthDate:
          validator = new BirthDateValidator();
          break;
        case InputDataType.City:
          validator = new CityValidator();
          break;
        case InputDataType.Apartment:
          validator = new AppartmentValidator();
          break;
        case InputDataType.Country:
          validator = new CountryValidator();
          break;
        case InputDataType.PostalCode:
          if (resource) validator = new PostalCodeValidator(resource as Countries);
          else throw Error('Please select country');
          break;
        case InputDataType.Name:
        default:
          validator = new NameValidator();
          break;
      }
      return validator.validate(value, isRequired);
    };
  }
}
