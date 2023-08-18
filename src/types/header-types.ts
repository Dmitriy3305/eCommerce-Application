import { AppLink } from '../app/router/router-types';
import DOMComponent from '../components/base-component';

export type LinkCreateCallback = (url: AppLink, link: DOMComponent<HTMLElement>) => void;
