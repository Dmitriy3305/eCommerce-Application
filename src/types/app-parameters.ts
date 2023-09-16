import { FormSubmitCallback } from '../components/form/form-component';
import { InputDataType, InputValues } from './input-datas';
import ValidationCallback from './validation-callback';

export type AppInfo = {
  name: string;
  description: string;
};

export type AuthorizationParameters = {
  isAuthorized: boolean;
  logoutCallback: () => void;
};

export type FormParameters = {
  validationCallbacks: Map<InputDataType, ValidationCallback>;
  submitCallback: FormSubmitCallback;
  countries?: string[];
  inputValues?: InputValues;
};
