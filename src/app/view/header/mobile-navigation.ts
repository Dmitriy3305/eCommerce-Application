import DOMComponent from '../../../components/base-component';
import BurgerMenu from '../../../components/burger-menu/burger-menu';
import { LinkCreateCallback } from '../../../types/header-types';
import { getEnumKey } from '../../../utils/enum-utils';
import AppRouter from '../../router/router';
import { AppLink } from '../../router/router-types';
import CategoriesDropdown from './categories-dropdown';
import HeaderLogo from './header-logo';
import UserNavigation from './user-navigation';

enum MobileNavigationCssClasses {
  Logo = 'mobile-menu__logo',
  UserNav = 'mobile-navigation',
}

export default class MobileNavigation extends BurgerMenu {
  private navigation: UserNavigation;

  public constructor(
    router: AppRouter,
    links: AppLink[],
    linkCallback: LinkCreateCallback,
    parent: DOMComponent<HTMLElement>
  ) {
    super(parent);

    const logo = new HeaderLogo(router, '');
    logo.addClass(MobileNavigationCssClasses.Logo);
    this.append(logo);

    this.navigation = new UserNavigation(router, links, linkCallback);
    this.navigation.addClass(MobileNavigationCssClasses.UserNav);
    this.navigation.addLinkTexts(links.map((link) => getEnumKey(AppLink, link) || '???'));

    this.navigation.prepend(new CategoriesDropdown());

    this.append(this.navigation);
  }
}
