import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './buildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-application2023q1' });
const getProducts = async () => {
  return apiRoot.products().get().execute();
};
getProducts()
  .then((response) => {
    return response;
  })
  .catch(console.error);

export default getProducts;
