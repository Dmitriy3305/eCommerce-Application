export interface Router {
  navigate: (url: string) => void;
  getAbsoluteLink: (link: string) => string;
}
