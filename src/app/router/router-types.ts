export type RouteHandler = (link: AppLink, resources?: string[], queries?: URLSearchParams) => void;

export enum AppLink {
  Main = 'index',
  Login = 'login',
  Register = 'register',
  Cart = 'cart',
  Profile = 'profile',
  NotFound = 'not-found',
  AboutUs = 'about-us',
  Catalog = 'products',
  ProductPage = 'product-page',
}

export enum LinkQueries {
  CategoryFilter = 'category',
}
