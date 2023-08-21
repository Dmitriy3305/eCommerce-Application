import { Product, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import ctpClient from './buildClient';

export type GrouppedCategories = { [group: string]: string[] };

export default class ProductsRepository {
  private static PROJECT_KEY = 'ecommerce-application2023q1';

  private apiRoot: ByProjectKeyRequestBuilder;

  public constructor() {
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: ProductsRepository.PROJECT_KEY,
    });
  }

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
