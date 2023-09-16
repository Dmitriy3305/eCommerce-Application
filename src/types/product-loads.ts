import { ProductProjection } from '@commercetools/platform-sdk';

export type ProductFilterQueries = Partial<{
  category: string;
  searchName: string;
  priceFrom: number;
  priceTo: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}>;

export type ProductLoader = {
  load: (filterQueries?: ProductFilterQueries) => Promise<ProductProjection[]>;
  resetOffset: () => void;
};
