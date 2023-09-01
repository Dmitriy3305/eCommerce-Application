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
import FontAwesome from '../../../types/font-awesome';

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

  private userNavigation?: UserNavigation;

  private burgerMenu?: MobileNavigation;

  private mobileChangeHandler?: () => void;

  private categoriesDropdown: CategoriesDropdown;

  private router: AppRouter;

  private isAuthorized: boolean;

  private linkCallback: LinkCreateCallback;

  private logoutCallback: () => void;

  public constructor(
    router: AppRouter,
    appName: string,
    categories: GrouppedCategories,
    isAuthorized: boolean,
    logoutCallback: () => void
  ) {
    super(Header.HEADER_PARAMS);
    this.router = router;
    this.links = new Map();
    this.isAuthorized = isAuthorized;

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

    this.logoutCallback = logoutCallback;

    this.linkCallback = (url: string, link: DOMComponent<HTMLElement>) => {
      this.links.set(url, link);
    };
    this.categoriesDropdown = new CategoriesDropdown(router, categories, this.linkCallback);
    this.updateNavigation();
    this.burgerMenu = this.createBurgerMenu();
  }

  public override switchActiveLink(url: string): void {
    super.switchActiveLink(url);

    if (this.burgerMenu?.isShown) this.burgerMenu.hide();
  }

  private createBurgerMenu(): MobileNavigation {
    const mobileMediaQuery = matchMedia('(max-width: 500px)');
    const body = DOMComponent.FromElement(document.body);
    const burgerMenu = new MobileNavigation(this.router, body);
    const openButton = burgerMenu.generateOpenButton({ tag: Tags.Button });

    this.mobileChangeHandler = () => {
      if (mobileMediaQuery.matches) {
        body.append(openButton);

        if (this.userNavigation) {
          this.userNavigation?.removeClass(HeaderCssClasses.UserNav);
          burgerMenu.userNavigation = this.userNavigation;
        }

        burgerMenu.categoriesNavigation = this.categoriesDropdown;
      } else {
        openButton.remove();
        burgerMenu.removeNavigation();
        if (burgerMenu.isShown) burgerMenu.hide();

        if (this.userNavigation) {
          this.userNavigation.addClass(HeaderCssClasses.UserNav);
          this.append(this.userNavigation);
        }

        this.hoverMenu.append(this.categoriesDropdown);
        this.categoriesDropdown.disable();
      }
    };
    mobileMediaQuery.addEventListener('change', this.mobileChangeHandler);
    this.mobileChangeHandler();
    return burgerMenu;
  }

  public switchNavigationLinks(): void {
    this.isAuthorized = !this.isAuthorized;
    this.updateNavigation();
  }

  private updateNavigation(): void {
    const links = this.isAuthorized ? Header.AUTH_LINKS.slice(2) : Header.NOT_AUTH_LINKS.slice(2);

    this.userNavigation?.remove();
    this.userNavigation = new UserNavigation(this.router, links, this.linkCallback);
    if (this.isAuthorized) {
      this.userNavigation.addButtonWithIcon(FontAwesome.SignOut, this.logoutCallback);
    }
    if (this.mobileChangeHandler) this.mobileChangeHandler();
  }
}
