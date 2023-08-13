import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './buildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-application2023q1' });
const getCategories = async () => {
  console.log(apiRoot.apiClients);
  console.log(apiRoot.customers);
  console.log(apiRoot.apiClients);
  console.log(apiRoot.apiClients);

  return apiRoot.categories().get().execute();
};
getCategories()
  .then((response) => {
    return response;
  })
  .catch(console.error);
