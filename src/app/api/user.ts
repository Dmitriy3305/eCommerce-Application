import { CustomerDraft, Customer, Address } from '@commercetools/platform-sdk';
import Repository from './repository';

export default class AuthorizationManager extends Repository {
  public async register(user: CustomerDraft): Promise<Customer> {
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

      return customer;
    } catch (error) {
      const { message } = error as Error;
      if (message === 'There is already an existing customer with the provided email.')
        throw Error('We already have a customer with this email. Perhaps you wanted to log in?');
      else if (message.toLowerCase().includes('invalid json')) {
        throw Error('Invalid input. Fix errors and try again');
      } else throw Error('Something went wrong. Please try again later');
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
    } catch (error) {
      const { message } = error as Error;
      if (message.includes('credentials')) throw Error('Incorrect email or password');
      throw Error('Something went wrong. Please try again later');
    }
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
}
