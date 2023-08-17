export type RouterLink = {
  description: string;
  url: string;
};

export enum AppLink {
  Main = 'index',
  Login = 'login',
  Register = 'register',
  Cart = 'cart',
  Profile = 'profile',
  NotFound = 'not-found',
}
