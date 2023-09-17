import { Cart, LineItem, ProductProjection } from '@commercetools/platform-sdk';
import Repository from './repository';
import UserRepository from './user';

export default class CartManager extends Repository {
  private anonymousCartId?: string;

  private userRepo: UserRepository;

  public constructor(userRepo: UserRepository) {
    super();
    this.userRepo = userRepo;
    if (!this.userRepo.user)
      this.createCart().then((id) => {
        this.anonymousCartId = id;
      });
  }

  public get cart(): Promise<Cart> {
    return this.userRepo.user ? this.userCart : this.anonymousCart;
  }

  public async addProduct(product: ProductProjection) {
    const cart = await this.cart;
    await this.apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'addLineItem',
              productId: product.id,
              variantId: product.masterVariant.id,
            },
          ],
        },
      })
      .execute();
  }

  public async changeProductQuantity(product: ProductProjection, quantity: number) {
    const cart = await this.cart;
    const lineItem = await this.findLineItem(product);

    if (!lineItem) throw Error('No such product in cart');

    await this.apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId: lineItem.id,
              quantity,
            },
          ],
        },
      })
      .execute();
  }

  public async removeProduct(product: ProductProjection) {
    const cart = await this.cart;
    const lineItem = await this.findLineItem(product);

    if (!lineItem) throw Error('No such product in cart');

    await this.apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId: lineItem.id,
            },
          ],
        },
      })
      .execute();
  }

  public async checkPresence(product: ProductProjection): Promise<boolean> {
    return Boolean(await this.findLineItem(product));
  }

  public async bindAnonymousCartToUser() {
    const cart = await this.anonymousCart;
    const user = await this.userRepo.user;
    const discountCodes = await Promise.all(
      cart.discountCodes
        .map((discountCode) => discountCode.discountCode.id)
        .map((id) =>
          this.apiRoot
            .discountCodes()
            .withId({ ID: id })
            .get()
            .execute()
            .then((response) => response.body)
        )
    ).then((codes) => codes.map((code) => code.code));

    await this.apiRoot
      .carts()
      .post({
        body: {
          currency: 'USD',
          customerId: user?.id,
          lineItems: cart.lineItems,
          discountCodes,
        },
      })
      .execute();
  }

  public async clearCart() {
    const cart = await this.cart;
    await this.apiRoot
      .carts()
      .withId({ ID: cart.id })
      .delete({ queryArgs: { version: cart.version } });
    await this.createCart();
  }

  private async createCart(): Promise<string> {
    const user = await this.userRepo.user;
    const response = await this.apiRoot
      .carts()
      .post({
        body: {
          currency: 'USD',
          customerId: user ? user.id : undefined,
        },
      })
      .execute();
    return response.body.id;
  }

  private async findLineItem(product: ProductProjection): Promise<LineItem | undefined> {
    const cart = await this.cart;
    return cart.lineItems.find((item) => item.productId === product.id);
  }

  private get userCart(): Promise<Cart> {
    if (!this.userRepo.user) throw Error('Not authorized');
    return this.userRepo.user.then((user) => {
      return this.apiRoot
        .carts()
        .withCustomerId({ customerId: user.id })
        .get()
        .execute()
        .then((response) => response.body);
    });
  }

  private get anonymousCart(): Promise<Cart> {
    return this.apiRoot
      .carts()
      .withId({ ID: this.anonymousCartId || '' })
      .get()
      .execute()
      .then((response) => response.body);
  }
}
