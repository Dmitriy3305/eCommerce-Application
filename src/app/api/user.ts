import { Customer, CustomerDraft, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import ctpClient from './buildClient';

export default class AuthorizationManager {
  private static PROJECT_KEY = 'ecommerce-application2023q1';

  private apiRoot: ByProjectKeyRequestBuilder;

  public constructor() {
    this.apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
      projectKey: AuthorizationManager.PROJECT_KEY,
    });
  }

  public async register(user: CustomerDraft): Promise<Customer> {
    try {
      const response = await this.apiRoot.customers().post({ body: user }).execute();
      return response.body.customer;
    } catch {
      throw Error('Registration error');
    }
  }

  public async authorize(email: string, password: string): Promise<Customer> {
    try {
      const response = await this.apiRoot
        .login()
        .post({
          body: {
            email,
            password,
          },
        })
        .execute();
      return response.body.customer;
    } catch {
      throw Error('Invalid credentials');
    }
  }
}
