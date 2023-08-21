import { Product, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import ctpClient from './buildClient';

export default class ProductsRepository {
  private static PROJECT_KEY = 'ecommerce-application2023q1';

  private apiRoot: ByProjectKeyRequestBuilder;

  public constructor() {
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: ProductsRepository.PROJECT_KEY,
    });
  }

  public async getCategoriesNames(): Promise<string[]> {
    const response = await this.apiRoot.categories().get().execute();
    return response.body.results.map((category) => category.key || '');
  }

  public async getProducts(): Promise<Product[]> {
    const response = await this.apiRoot.products().get().execute();
    return response.body.results;
  }
}
