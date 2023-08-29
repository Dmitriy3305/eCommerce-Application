import { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import ProductsRepository, { GrouppedCategories } from '../api/products';
import AuthorizationManager from '../api/user';
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

export default class AppController {
  private products: ProductsRepository;

  private authManager: AuthorizationManager;

  private projectSettings: ProjectSettingsRepository;

  private currentCustomer: Customer | null = null;

  public constructor() {
    this.products = new ProductsRepository();
    this.authManager = new AuthorizationManager();
    this.projectSettings = new ProjectSettingsRepository();
  }

  public get isAuthorized(): boolean {
    return this.currentCustomer !== null;
  }

  public async tryAuthorize(email: string, password: string): Promise<boolean> {
    try {
      this.currentCustomer = await this.authManager.authorize(email, password);
      return true;
    } catch {
      return false;
    }
  }

  public async register(credentials: CustomerDraft) {
    this.currentCustomer = await this.authManager.register(credentials);
  }

  public async loadCategories(callback: (categories: GrouppedCategories) => void): Promise<void> {
    const categories = await this.products.getCategoriesGroups();
    callback(categories);
  }

  public getValidationCallbacks(): Map<InputDataType, ValidationCallback> {
    const callbacks = new Map();
    Object.values(InputDataType).forEach((value) => {
      callbacks.set(value, this.getDefaultValidationCallback(value));
    });
    return callbacks;
  }

  private getDefaultValidationCallback(type: InputDataType): ValidationCallback {
    // eslint-disable-next-line func-names
    return function (value: string, isRequired: boolean, resource?: string) {
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
        case InputDataType.Appartment:
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

  public loadCountries(): Promise<string[]> {
    return this.projectSettings.getCountries();
  }
}
