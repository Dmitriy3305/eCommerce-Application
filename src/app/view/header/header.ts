import DOMComponent, { ElementParameters } from '../../../components/base-component';
import HoverMenu from '../../../components/hover-menu/hover-menu';
import { Tags } from '../../../types/dom-types/enums';
import HeaderLogo from './header-logo';
import MobileNavigation from './mobile-navigation';
import UserNavigation from './user-navigation';

enum HeaderCssClasses {
  Header = 'header',
  Logo = 'header__logo',
  CategoriesButton = 'header__categories-show',
  CategoriesMenu = 'header__categories-nav',
  UserNav = 'header__user-nav',
  BurgerMenuOpen = 'header__open-burger-menu',
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

  private categoriesNavigation: HoverMenu;

  private userNavigation: UserNavigation;

  public constructor(appName: string) {
    super(Header.HEADER_PARAMS);

    this.logo = new HeaderLogo(appName);
    this.logo.addClass(HeaderCssClasses.Logo);
    this.append(this.logo);

    this.categoriesNavigation = new HoverMenu();
    this.categoriesNavigation.addClass(HeaderCssClasses.CategoriesMenu);
    this.append(this.categoriesNavigation);

    this.categoriesButton = this.categoriesNavigation.generateHoverButton({
      ...Header.CATEGORIES_BUTTON_PARAMS,
      parent: this,
    });

    this.userNavigation = new UserNavigation(); // TODO: get if user is authorized from services
    this.userNavigation.addClass(HeaderCssClasses.UserNav);
    this.append(this.userNavigation);

    const body = DOMComponent.FromElement(document.body);
    const burgerMenu = new MobileNavigation(body);

    body.append(
      burgerMenu.generateOpenButton({
        tag: Tags.Button,
      })
    );
  }
}
