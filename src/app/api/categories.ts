import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './buildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-application2023q1' });
const getCategories = async () => {
  return apiRoot.categories().get().execute();
};
getCategories()
  .then((response) => {
    console.log(response);
    return response;
  })
  .catch(console.error);
