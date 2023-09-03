import { ProductProjection } from '@commercetools/platform-sdk';
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

  public async filterProducts(page?: number, category?: string): Promise<ProductProjection[]> {
    const offset = page ? (page - 1) * ProductsRepository.PRODUCTS_PER_PAGE : undefined;

    if (category) {
      const categoryId = await this.getCategoryIdByKey(category);
      const response = await this.apiRoot
        .productProjections()
        .search()
        .get({ queryArgs: { offset, 'filter.query': `categories.id:"${categoryId}"` } })
        .execute();
      return response.body.results;
    }
    const response = await this.apiRoot.productProjections().get({ queryArgs: { offset } }).execute();
    return response.body.results;
  }

  private async getCategoryIdByKey(key: string): Promise<string> {
    const response = await this.apiRoot.categories().withKey({ key }).get().execute();
    return response.body.id;
  }
}
