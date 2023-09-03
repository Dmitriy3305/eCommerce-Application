import { Product } from '@commercetools/platform-sdk';
import Repository from './repository';

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

  public async getProducts(page?: number): Promise<Product[]> {
    const offset = page ? (page - 1) * ProductsRepository.PRODUCTS_PER_PAGE : undefined;
    const response = await this.apiRoot.products().get({ queryArgs: { offset } }).execute();
    return response.body.results;
  }
}
