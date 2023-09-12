import { ProductProjection } from '@commercetools/platform-sdk';

export type ProductFilterQueries = Partial<{
  category: string;
  searchName: string;
}>;

export type ProductLoader = {
  load: (filterQueries?: ProductFilterQueries) => Promise<ProductProjection[]>;
  resetOffset: () => void;
};
