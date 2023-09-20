import { ProductProjection } from '@commercetools/platform-sdk';

export type CartProduct = {
  product: ProductProjection;
  quantity: number;
  price: number;
};
