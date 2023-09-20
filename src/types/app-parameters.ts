import { ProductVariant } from '@commercetools/platform-sdk';
import { FormSubmitCallback } from '../components/form/form-component';
import { InputDataType, InputValues } from './input-datas';
import ValidationCallback from './validation-callback';
import { CartProduct } from './cart-product';

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

export type CartParameters = {
  productsGetter: () => Promise<CartProduct[]>;
  totalPriceGetter: () => Promise<number>;
  discountApplyer: (promocode: string) => Promise<void>;
  includeChecker: (id: string) => Promise<boolean>;
  productAdder: (product: ProductVariant) => Promise<void>;
  productUpdater: (id: string, quantity: number) => Promise<void>;
  productDeleter: (productId: string) => Promise<void>;
  cartClearer: () => Promise<void>;
};
