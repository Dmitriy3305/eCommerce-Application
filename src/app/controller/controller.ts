import ProductsRepository from '../api/products';

export default class AppController {
  private products: ProductsRepository;

  public constructor() {
    this.products = new ProductsRepository();
    this.products.getProducts();
  }

  // TODO: implement with authorization
  public get isAuthorized(): boolean {
    return true;
  }
}
