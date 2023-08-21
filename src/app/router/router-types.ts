export type RouterLink = {
  description: string;
  url: string;
};

export type RouteHandler = (resource?: string, queries?: URLSearchParams) => void;

export enum AppLink {
  Main = 'index',
  Login = 'login',
  Register = 'register',
  Cart = 'cart',
  Profile = 'profile',
  NotFound = 'not-found',
  AboutUs = 'about-us',
  Catalog = 'products',
}

export enum LinkQueries {
  CategoryFilter = 'category',
}