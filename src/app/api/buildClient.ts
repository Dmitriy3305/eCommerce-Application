import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ecommerce-application2023q1',
  credentials: {
    clientId: '7pHPNkV7WEOXJmu51MUa1Lew',
    clientSecret: 'QiCEhKdTJKC7AQDEZndyAYpwLK7siiKy',
  },
  scopes: [
    'view_products:ecommerce-application2023q1 manage_my_shopping_lists:ecommerce-application2023q1 manage_my_quotes:ecommerce-application2023q1 manage_my_profile:ecommerce-application2023q1 view_categories:ecommerce-application2023q1 manage_my_business_units:ecommerce-application2023q1 create_anonymous_token:ecommerce-application2023q1 view_published_products:ecommerce-application2023q1 manage_my_quote_requests:ecommerce-application2023q1 manage_my_orders:ecommerce-application2023q1',
  ],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};
const projectKey = 'ecommerce-application2023q1';
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;