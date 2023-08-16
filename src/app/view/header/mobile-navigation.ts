import DOMComponent from '../../../components/base-component';
import BurgerMenu from '../../../components/burger-menu/burger-menu';
import CategoriesDropdown from './categories-dropdown';
import HeaderLogo from './header-logo';
import UserNavigation from './user-navigation';

enum MobileNavigationCssClasses {
  Logo = 'mobile-menu__logo',
  UserNav = 'mobile-navigation',
}

export default class MobileNavigation extends BurgerMenu {
  private navigation: UserNavigation;

  public constructor(parent: DOMComponent<HTMLElement>) {
    super(parent);

    // TODO: links (probably only descriptions) should be loaded from router
    const linkMocks = [
      {
        description: 'Register',
        url: '/register',
      },
      {
        description: 'Login',
        url: '/login',
      },
      {
        description: 'Cart',
        url: '/cart',
      },
    ];

    // TODO: app name and description probably should be avaliable globally
    const logo = new HeaderLogo('');
    logo.addClass(MobileNavigationCssClasses.Logo);
    this.append(logo);

    this.navigation = new UserNavigation();
    this.navigation.addClass(MobileNavigationCssClasses.UserNav);
    this.navigation.addLinkTexts(linkMocks.map((link) => link.description));

    this.navigation.prepend(new CategoriesDropdown());

    this.append(this.navigation);
  }
}
