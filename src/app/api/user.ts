import { CustomerDraft, Customer, Address, CustomerToken } from '@commercetools/platform-sdk';
import Repository from './repository';

export default class UserRepository extends Repository {
  public static STORAGE_KEY = 'shoe-corner:auth-token';

  private token: CustomerToken | null = null;

  public checkToken(): void {
    const tokenJson = localStorage.getItem(UserRepository.STORAGE_KEY);
    if (tokenJson) {
      const token = JSON.parse(tokenJson) as CustomerToken;
      if (new Date(token.expiresAt) < new Date()) {
        this.logout();
        throw Error('Authorization token expired. Please login again');
      } else this.token = token;
    }
  }

  public get user(): Promise<Customer> | null {
    if (this.token) {
      const request = this.apiRoot.customers().withPasswordToken({ passwordToken: this.token.value }).get().execute();
      return request.then((response) => response.body);
    }
    return null;
  }

  public async register(user: CustomerDraft) {
    try {
      const response = await this.apiRoot.customers().post({ body: user }).execute();
      let { customer } = response.body;

      if (user.addresses) customer = await this.addAdresses(customer, ...user.addresses);

      if (typeof user.defaultShippingAddress === 'number') {
        const shippingAddress = customer.addresses[user.defaultShippingAddress];
        customer = await this.setDefaultAddress(customer, shippingAddress, 'Shipping');
      }

      if (typeof user.defaultBillingAddress === 'number') {
        const billingAddress = customer.addresses[user.defaultBillingAddress];
        customer = await this.setDefaultAddress(customer, billingAddress, 'Billing');
      }

      this.token = await this.getToken(customer.email);
    } catch (error) {
      const { message } = error as Error;
      if (message === 'There is already an existing customer with the provided email.')
        throw Error('We already have a customer with this email. Perhaps you wanted to log in?');
      else if (message.toLowerCase().includes('invalid json')) {
        throw Error('Invalid input. Fix errors and try again');
      } else throw Error('Something went wrong. Please try again later');
    }
  }

  public async getDataUser(customerId: string) {
    const response = await this.apiRoot
      .customers()
      .withId({ ID: `${customerId}` })
      .get()
      .execute();
    return response.body;
  }

  public async authorize(email: string, password: string) {
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
      this.token = await this.getToken(response.body.customer.email);
    } catch (error) {
      const { message } = error as Error;
      if (message.includes('credentials')) throw Error('Incorrect email or password');
      throw Error('Something went wrong. Please try again later');
    }
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem(UserRepository.STORAGE_KEY);
  }

  public async addAdresses(customer: Customer, ...addresses: Address[]): Promise<Customer> {
    const updateResponse = await this.apiRoot
      .customers()
      .withId({ ID: customer.id })
      .post({
        body: {
          version: customer.version,
          actions: addresses.map((userAddress) => {
            return { action: 'addAddress', address: userAddress };
          }),
        },
      })
      .execute();
    return updateResponse.body;
  }

  public async setDefaultAddress(
    customer: Customer,
    address: Address,
    type: 'Shipping' | 'Billing'
  ): Promise<Customer> {
    const updateResponse = await this.apiRoot
      .customers()
      .withId({ ID: customer.id })
      .post({
        body: {
          version: customer.version,
          actions: [
            {
              action: `setDefault${type}Address`,
              addressId: address.id,
            },
          ],
        },
      })
      .execute();
    if (updateResponse.statusCode && updateResponse.statusCode >= 400) throw Error();
    return updateResponse.body;
  }

  private async getToken(email: string): Promise<CustomerToken> {
    const response = await this.apiRoot
      .customers()
      .passwordToken()
      .post({
        body: {
          email,
        },
      })
      .execute();
    const token = response.body;
    localStorage.setItem(UserRepository.STORAGE_KEY, JSON.stringify(token));
    return token;
  }
}
