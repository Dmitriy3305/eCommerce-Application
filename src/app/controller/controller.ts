import { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import ProductsRepository from '../api/products';
import AuthorizationManager from '../api/user';

export default class AppController {
  private products: ProductsRepository;

  private authManager: AuthorizationManager;

  private currentCustomer: Customer | null = null;

  public constructor() {
    this.products = new ProductsRepository();
    this.authManager = new AuthorizationManager();
  }

  public get isAuthorized(): boolean {
    return this.currentCustomer !== null;
  }

  public async tryAuthorize(email: string, password: string): Promise<boolean> {
    try {
      this.currentCustomer = await this.authManager.authorize(email, password);
      return true;
    } catch {
      return false;
    }
  }

  public async register(credentials: CustomerDraft) {
    this.currentCustomer = await this.authManager.register(credentials);
  }
}
