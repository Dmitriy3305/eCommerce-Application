/**
 * @jest-environment node
 */

// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import fetch from 'node-fetch';
import ProductsRepository from '../app/api/products';

describe('Products repository', () => {
  const repository = new ProductsRepository();

  it('loads products', async () => {
    const products = await repository.getProducts();
    expect(products).toBeTruthy();
  });

  it('loads categories', async () => {
    expect(await repository.getCategoriesGroups()).toBeTruthy();
  });
});
