import DOMComponent, { ElementParameters } from '../../../components/base-component';
import DropdownMenu from '../../../components/dropdown-menu';
import { Events, Tags } from '../../../types/dom-types/enums';
import HeaderLogo from './header-logo';
import UserNavigation from './user-navigation';

enum HeaderCssClasses {
  Header = 'header',
  Logo = 'header__logo',
  CategoriesButton = 'header__categories-show',
  CategoriesMenu = 'header__categories-nav',
  UserNav = 'header__user-nav',
}

export default class Header extends DOMComponent<HTMLElement> {
  private static HEADER_PARAMS: ElementParameters = {
    tag: Tags.Header,
    classList: [HeaderCssClasses.Header],
  };

  private static CATEGORIES_BUTTON_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [HeaderCssClasses.CategoriesButton],
    textContent: 'Catalog',
  };

  private logo: HeaderLogo;

  private categoriesButton: DOMComponent<HTMLButtonElement>;

  private categoriesNavigation: DropdownMenu;

  private userNavigation: UserNavigation;

  public constructor(appName: string) {
    super(Header.HEADER_PARAMS);

    this.logo = new HeaderLogo(appName);
    this.logo.addClass(HeaderCssClasses.Logo);
    this.append(this.logo);

    this.categoriesButton = new DOMComponent<HTMLButtonElement>({
      ...Header.CATEGORIES_BUTTON_PARAMS,
      parent: this,
    });

    this.categoriesNavigation = new DropdownMenu();
    this.append(this.categoriesNavigation);
    this.categoriesButton.addEventListener(Events.MouseOver, () => {
      this.categoriesNavigation.show();
    });

    this.userNavigation = new UserNavigation(false);
    this.userNavigation.addClass(HeaderCssClasses.UserNav);
    this.append(this.userNavigation);
  }
}
