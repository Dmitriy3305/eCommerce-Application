import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import { LinkCreateCallback } from '../../../types/header-types';
import AppRouter from '../../router/router';
import { AppLink } from '../../router/router-types';
import RoutedComponent from '../../../components/routed-component';
import HeaderLogo from './header-logo';
import MobileNavigation from './mobile-navigation';
import UserNavigation from './user-navigation';
import CategoriesDropdown from './categories-dropdown';
import HoverMenu from '../../../components/hover-menu/hover-menu';
import { GrouppedCategories } from '../../api/products';

enum HeaderCssClasses {
  Header = 'header',
  Logo = 'header__logo',
  CategoriesButton = 'header__categories-show',
  CategoriesMenu = 'header__categories-nav',
  UserNav = 'header__user-nav',
  BurgerMenuOpen = 'header__open-burger-menu',
}

export default class Header extends RoutedComponent {
  private static HEADER_PARAMS: ElementParameters = {
    tag: Tags.Header,
    classList: [HeaderCssClasses.Header],
  };

  private static CATEGORIES_BUTTON_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [HeaderCssClasses.CategoriesButton],
    textContent: 'Catalog',
  };

  private static NOT_AUTH_LINKS = [AppLink.Main, AppLink.Catalog, AppLink.Register, AppLink.Login, AppLink.Cart];

  private static AUTH_LINKS = [AppLink.Main, AppLink.Catalog, AppLink.Profile, AppLink.Cart];

  public static NAVIGATION_LINKS = Header.NOT_AUTH_LINKS.concat(Header.AUTH_LINKS);

  private logo: HeaderLogo;

  private categoriesButton: DOMComponent<HTMLButtonElement>;

  private hoverMenu: HoverMenu;

  private userNavigation: UserNavigation;

  private burgerMenu: MobileNavigation;

  private categoriesDropdown: CategoriesDropdown;

  private router: AppRouter;

  private linkCallback: LinkCreateCallback;

  public constructor(router: AppRouter, appName: string, categories: GrouppedCategories) {
    super(Header.HEADER_PARAMS);
    this.router = router;
    this.links = new Map();

    this.logo = new HeaderLogo(router, appName);
    this.logo.addClass(HeaderCssClasses.Logo);
    this.append(this.logo);
    this.links.set(AppLink.Main, this.logo);

    this.hoverMenu = new HoverMenu();
    this.hoverMenu.addClass(HeaderCssClasses.CategoriesMenu);
    this.append(this.hoverMenu);

    this.categoriesButton = this.hoverMenu.generateHoverButton({
      ...Header.CATEGORIES_BUTTON_PARAMS,
      parent: this,
    });

    this.linkCallback = (url: string, link: DOMComponent<HTMLElement>) => {
      this.links.set(url, link);
    };
    this.categoriesDropdown = new CategoriesDropdown(router, categories, this.linkCallback);
    this.userNavigation = new UserNavigation(router, Header.NOT_AUTH_LINKS.slice(2), this.linkCallback); // TODO: get if user is authorized from services
    this.burgerMenu = this.createBurgerMenu();
  }

  public override switchActiveLink(url: string): void {
    super.switchActiveLink(url);

    if (this.burgerMenu.isShown) this.burgerMenu.hide();
  }

  private createBurgerMenu(): MobileNavigation {
    const mobileMediaQuery = matchMedia('(max-width: 500px)');
    const body = DOMComponent.FromElement(document.body);
    const burgerMenu = new MobileNavigation(this.router, body);
    const openButton = burgerMenu.generateOpenButton({ tag: Tags.Button });

    const mediaQueryChangeHandler = () => {
      if (mobileMediaQuery.matches) {
        body.append(openButton);
        this.userNavigation.removeClass(HeaderCssClasses.UserNav);
        burgerMenu.userNavigation = this.userNavigation;

        burgerMenu.categoriesNavigation = this.categoriesDropdown;
      } else {
        openButton.remove();
        burgerMenu.removeNavigation();
        if (burgerMenu.isShown) burgerMenu.hide();

        this.userNavigation.addClass(HeaderCssClasses.UserNav);
        this.append(this.userNavigation);

        this.hoverMenu.append(this.categoriesDropdown);
        this.categoriesDropdown.disable();
      }
    };
    mobileMediaQuery.addEventListener('change', mediaQueryChangeHandler);
    mediaQueryChangeHandler();
    return burgerMenu;
  }
}
