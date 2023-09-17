import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
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
import { AuthorizationParameters } from '../../../types/app-parameters';

enum HeaderCssClasses {
  Header = 'header',
  Logo = 'header__logo',
  CategoriesButton = 'header__categories-show',
  CategoriesMenu = 'header__categories-nav',
  AboutUsLink = 'header__about-us-show',
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

  private static ABOUTUS_LINK_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [HeaderCssClasses.AboutUsLink],
    textContent: 'About Us',
  };

  private static NOT_AUTH_LINKS = [AppLink.Main, AppLink.Catalog, AppLink.Register, AppLink.Login, AppLink.Cart];

  private static AUTH_LINKS = [AppLink.Main, AppLink.Catalog, AppLink.Profile, AppLink.Cart];

  public static NAVIGATION_LINKS = Header.NOT_AUTH_LINKS.concat(Header.AUTH_LINKS);

  private logo: HeaderLogo;

  private categoriesButton: DOMComponent<HTMLButtonElement>;

  private aboutUsLink: DOMComponent<HTMLAnchorElement>;

  private hoverMenu: HoverMenu;

  private userNavigation?: UserNavigation;

  private burgerMenu?: MobileNavigation;

  private mobileChangeHandler?: () => void;

  private categoriesDropdown: CategoriesDropdown;

  private router: AppRouter;

  private linkCallback: LinkCreateCallback;

  private authParams: AuthorizationParameters;

  private categories: GrouppedCategories;

  public constructor(
    router: AppRouter,
    appName: string,
    categories: GrouppedCategories,
    authParams: AuthorizationParameters
  ) {
    super(Header.HEADER_PARAMS);
    this.categories = categories;
    this.router = router;
    this.links = new Map();
    this.authParams = authParams;

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

    this.aboutUsLink = new DOMComponent<HTMLAnchorElement>({
      tag: Tags.Anchor,
      classList: [HeaderCssClasses.AboutUsLink],
      attributes: {
        href: AppLink.AboutUs,
      },
      textContent: 'About Us',
      parent: this,
    });

    this.linkCallback = (url: string, link: DOMComponent<HTMLElement>) => {
      this.links.set(url, link);
    };
    this.categoriesDropdown = new CategoriesDropdown(router, categories, this.linkCallback);
    this.updateNavigation();
    this.burgerMenu = this.createBurgerMenu();
  }

  public get categoryGroups(): GrouppedCategories {
    return this.categories;
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
    this.authParams.isAuthorized = !this.authParams.isAuthorized;
    this.updateNavigation();
  }

  private updateNavigation(): void {
    const links = this.authParams.isAuthorized ? Header.AUTH_LINKS.slice(2) : Header.NOT_AUTH_LINKS.slice(2);

    const addNavigation = () => {
      this.userNavigation = new UserNavigation(this.router, links, this.linkCallback);
      if (this.authParams.isAuthorized) {
        this.userNavigation.addButtonWithIcon(FontAwesome.SignOut, this.authParams.logoutCallback);
      }
      if (this.mobileChangeHandler) this.mobileChangeHandler();
    };

    if (this.userNavigation) {
      this.userNavigation?.addEventListener(Events.AnimationEnd, () => {
        this.userNavigation?.remove();
        addNavigation();
      });
      this.userNavigation?.showAnimation({
        name: 'fade-out',
        duration: 300,
      });
    } else addNavigation();
  }
}
