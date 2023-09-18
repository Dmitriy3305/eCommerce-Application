import { Cart, LineItem, ProductVariant } from '@commercetools/platform-sdk';
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
    else if (!this.userCart) this.createCart();
  }

  public get cart(): Promise<Cart> {
    return this.userRepo.userExists ? this.userCart : this.anonymousCart;
  }

  public async addProduct(product: ProductVariant) {
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
              sku: product.sku,
            },
          ],
        },
      })
      .execute();
  }

  public async changeProductQuantity(productId: string, quantity: number) {
    const cart = await this.cart;
    const lineItem = await this.findLineItem(productId, cart);

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

  public async removeProduct(productId: string) {
    const cart = await this.cart;
    const lineItem = await this.findLineItem(productId, cart);

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

  public async checkPresence(productId: string): Promise<boolean> {
    return Boolean(await this.findLineItem(productId));
  }

  public async bindAnonymousCartToUser() {
    const cart = await this.anonymousCart;
    if (!cart.lineItems.length) return;

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
    this.clearCart(await this.anonymousCart);
  }

  public async applyDiscount(promocode: string) {
    const cart = await this.cart;
    await this.apiRoot
      .carts()
      .withId({ ID: cart.id })
      .post({
        body: {
          version: cart.version,
          actions: [
            {
              action: 'addDiscountCode',
              code: promocode,
            },
          ],
        },
      })
      .execute();
  }

  public async clearCart(clearedCart?: Cart) {
    const cart = clearedCart || (await this.cart);
    await this.apiRoot
      .carts()
      .withId({ ID: cart?.id })
      .delete({ queryArgs: { version: cart.version } });
    if (!clearedCart) {
      const newCartId = await this.createCart();
      if (!this.userRepo.user) this.anonymousCartId = newCartId;
    }
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

  private async findLineItem(productId: string, cart?: Cart): Promise<LineItem | undefined> {
    const searchedCart = cart || (await this.cart);
    return searchedCart.lineItems.find((item) => item.productId === productId);
  }

  private get userCart(): Promise<Cart> {
    if (!this.userRepo.user) throw Error('Not authorized');
    return this.userRepo.user.then((user) => {
      return this.apiRoot
        .carts()
        .withCustomerId({ customerId: user.id })
        .get()
        .execute()
        .then((response) => response.body)
        .catch(() => this.createCart().then(() => this.userCart));
    });
  }

  private get anonymousCart(): Promise<Cart> {
    if (!this.anonymousCartId)
      return this.createCart().then((id) => {
        this.anonymousCartId = id;
        return this.anonymousCart;
      });
    return this.apiRoot
      .carts()
      .withId({ ID: this.anonymousCartId || '' })
      .get()
      .execute()
      .then((response) => response.body);
  }
}
