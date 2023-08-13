import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import HeaderLogo from './header-logo';

enum HeaderCssClasses {
  Header = 'header',
  Logo = 'header__logo',
  CategoriesNavigation = 'header__categories',
  UserNavigation = 'header__user-nav',
}

export default class Header extends DOMComponent<HTMLElement> {
  private static HEADER_PARAMS: ElementParameters = {
    tag: Tags.Header,
    classList: [HeaderCssClasses.Header],
  };

  private logo: HeaderLogo;

//   private categories: DOMComponent<HTMLElement>;

//   private userNavigation: DOMComponent<HTMLElement>;

  public constructor(appName: string) {
    super(Header.HEADER_PARAMS);

    this.logo = new HeaderLogo(appName);
    this.logo.addClass(HeaderCssClasses.Logo);
    this.append(this.logo);
  }
}
