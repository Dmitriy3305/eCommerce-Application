import { Product } from '@commercetools/platform-sdk';
import Repository from './repository';

export type GrouppedCategories = { [group: string]: string[] };

export default class ProductsRepository extends Repository {
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

  public async getProducts(): Promise<Product[]> {
    const response = await this.apiRoot.products().get().execute();
    return response.body.results;
  }
}
