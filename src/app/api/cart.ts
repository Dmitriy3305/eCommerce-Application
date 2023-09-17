// import { ProductProjection } from '@commercetools/platform-sdk';
import Repository from './repository';
import UserRepository from './user';

export default class CartManager extends Repository {
  private static ANONYMOUS_CART_KEY = 'shoe-corner:anonymous-cart';

  private userRepo: UserRepository;

  public constructor(userRepo: UserRepository) {
    super();
    this.userRepo = userRepo;
  }

  public get cart() {
    return this.userRepo.user
      ?.then((customer) => {
        return this.apiRoot
          .carts()
          .withCustomerId({ customerId: customer?.id || '' })
          .get()
          .execute();
      })
      .then((cartResponse) => {
        return cartResponse.body;
      });
  }

  // public addProduct(product: ProductProjection): void {}

  // public changeProductQuantity(product: ProductProjection): void {}

  // public removeProduct(product: ProductProjection): void {}

  // public checkPresence(product: ProductProjection): boolean {}

  // private createCart() {}
}
