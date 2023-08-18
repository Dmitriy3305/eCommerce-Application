import DOMComponent from '../../../components/base-component';
import BurgerMenu from '../../../components/burger-menu/burger-menu';
import AppRouter from '../../router/router';
import CategoriesDropdown from './categories-dropdown';
import HeaderLogo from './header-logo';
import UserNavigation from './user-navigation';

enum MobileNavigationCssClasses {
  Logo = 'mobile-menu__logo',
  UserNav = 'mobile-navigation',
}

export default class MobileNavigation extends BurgerMenu {
  private categories: CategoriesDropdown;

  private navigation: UserNavigation | null = null;

  public constructor(router: AppRouter, parent: DOMComponent<HTMLElement>) {
    super(parent);

    const logo = new HeaderLogo(router, '');
    logo.addClass(MobileNavigationCssClasses.Logo);
    this.append(logo);

    this.categories = new CategoriesDropdown();
  }

  public set userNavigation(value: UserNavigation) {
    this.navigation = value;
    this.navigation.addClass(MobileNavigationCssClasses.UserNav);
    this.navigation.addLinkTexts();
    this.navigation.prepend(this.categories);
    this.append(this.navigation);
  }

  public removeNavigation(): void {
    this.navigation?.removeClass(MobileNavigationCssClasses.UserNav);
    this.categories.remove();
    this.navigation?.remove();
    this.navigation?.removeLinkTexts();
  }
}
