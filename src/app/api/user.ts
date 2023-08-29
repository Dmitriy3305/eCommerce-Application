import { CustomerDraft, Customer } from '@commercetools/platform-sdk';
import Repository from './repository';

export default class AuthorizationManager extends Repository {
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
