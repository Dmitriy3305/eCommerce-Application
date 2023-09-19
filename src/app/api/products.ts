import { ProductProjection } from '@commercetools/platform-sdk';
import Repository from './repository';
import { ProductFilterQueries } from '../../types/product-loads';

export type GrouppedCategories = { [group: string]: string[] };

export default class ProductsRepository extends Repository {
  private static PRODUCTS_PER_PAGE = 20;

  public async getCategoriesGroups(): Promise<GrouppedCategories> {
    const response = await this.apiRoot.categories().get().execute();
    const categories = response.body.results;
    const result: GrouppedCategories = {};

    categories.forEach((category) => {
      if (category.parent) {
        const key = category.parent.id;
        if (!result[key]) result[key] = [];
        result[key].push(category.key || '');
      }
    });
    return result;
  }

  public async filterProducts(page?: number, queries?: ProductFilterQueries): Promise<ProductProjection[]> {
    const offset = page ? (page - 1) * ProductsRepository.PRODUCTS_PER_PAGE : undefined;

    const queryArgs: { offset?: number; 'filter.query'?: string[]; 'text.en-US'?: string; sort?: string } = {
      offset,
    };

    queryArgs['filter.query'] = [];

    if (queries?.category) {
      const categoryId = await this.getCategoryIdByKey(queries.category);
      queryArgs['filter.query'].push(`categories.id:"${categoryId}"`);
    }

    if (queries?.searchName) queryArgs['text.en-US'] = queries.searchName;

    if (queries?.sortBy) queryArgs.sort = `${queries.sortBy} ${queries.sortOrder}`;

    if (queries?.priceFrom || queries?.priceTo) {
      const priceFrom = queries.priceFrom ? queries.priceFrom * 100 : '*';
      const priceTo = queries.priceTo ? queries.priceTo * 100 : '*';

      const priceFilterQuery = `variants.price.centAmount:range (${priceFrom} to ${priceTo})`;
      queryArgs['filter.query'].push(priceFilterQuery);
    }

    const response = await this.apiRoot.productProjections().search().get({ queryArgs }).execute();
    return response.body.results;
  }

  private async getCategoryIdByKey(key: string): Promise<string> {
    const response = await this.apiRoot.categories().withKey({ key }).get().execute();
    return response.body.id;
  }

  public async getProductProjectionByKey(productKey: string) {
    const response = await this.apiRoot.productProjections().withKey({ key: productKey }).get().execute();
    return response.body;
  }

  public async getProductProjectionById(id: string) {
    return (await this.apiRoot.productProjections().withId({ ID: id }).get().execute()).body;
  }
}
