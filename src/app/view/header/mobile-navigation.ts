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
  private categories: CategoriesDropdown | null = null;

  private navigation: UserNavigation | null = null;

  public constructor(router: AppRouter, parent: DOMComponent<HTMLElement>) {
    super(parent);

    const logo = new HeaderLogo(router, '');
    logo.addClass(MobileNavigationCssClasses.Logo);
    this.append(logo);
  }

  public set userNavigation(value: UserNavigation) {
    this.navigation = value;
    this.navigation.addClass(MobileNavigationCssClasses.UserNav);
    this.navigation.addLinkTexts();
    if (this.categories) this.navigation.prepend(this.categories);
    this.append(this.navigation);
  }

  public set categoriesNavigation(value: CategoriesDropdown) {
    this.categories = value;
    this.navigation?.prepend(this.categories);
    this.categories.enable();
  }

  public removeNavigation(): void {
    this.navigation?.removeClass(MobileNavigationCssClasses.UserNav);
    this.categories?.remove();
    this.navigation?.remove();
    this.navigation?.removeLinkTexts();
  }
}
