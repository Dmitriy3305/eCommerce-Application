import ProductsRepository, { GrouppedCategories } from '../api/products';

export default class AppController {
  private products: ProductsRepository;

  public constructor() {
    this.products = new ProductsRepository();
  }

  // TODO: implement with authorization
  public get isAuthorized(): boolean {
    return true;
  }

  public async loadCategories(callback: (categories: GrouppedCategories) => void): Promise<void> {
    const categories = await this.products.getCategoriesGroups();
    callback(categories);
  }
}
