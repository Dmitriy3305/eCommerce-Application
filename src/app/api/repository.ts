import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import ctpClient from './buildClient';

export default abstract class Repository {
  private static PROJECT_KEY = 'ecommerce-application2023q1';

  protected apiRoot: ByProjectKeyRequestBuilder;

  public constructor() {
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: Repository.PROJECT_KEY,
    });
  }
}
