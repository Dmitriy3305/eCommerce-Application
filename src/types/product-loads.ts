import { ProductProjection } from '@commercetools/platform-sdk';
import { CartProduct } from './cart-product';

export type ProductFilterQueries = Partial<{
  category: string;
  searchName: string;
  priceFrom: number;
  priceTo: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}>;

export type ProductLoader = {
  load: (filterQueries?: ProductFilterQueries) => Promise<(ProductProjection | CartProduct)[]>;
  resetOffset: () => void;
};
