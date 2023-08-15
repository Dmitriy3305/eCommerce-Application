import DOMComponent from '../../../components/base-component';
import Navigation from '../../../components/navigation';
import { Tags } from '../../../types/dom-types/enums';
import FontAwesome from '../../../types/font-awesome';
import capitalizeString from '../../../utils/capitalize-string';

export default class UserNavigation extends Navigation {
  private static USER_LINKS_NOT_AUTHORIZED = ['/register', '/login', '/cart'];

  private static USER_LINKS_AUTHORIZED = ['/profile', '/cart'];

  public constructor(isAuthorized: boolean) {
    const urls = isAuthorized ? UserNavigation.USER_LINKS_AUTHORIZED : UserNavigation.USER_LINKS_NOT_AUTHORIZED;
    super(urls);

    this.links.forEach((link, index) => {
      const currentLink = link;

      const linkTitle = capitalizeString(urls[index].substring(1));
      currentLink.setAttribute('title', linkTitle);

      currentLink.append(this.getLinkIcon(linkTitle));
    });
  }

  private getLinkIcon(title: string): DOMComponent<HTMLElement> {
    const icon = new DOMComponent<HTMLElement>({
      tag: Tags.Icon,
      classList: [FontAwesome.Regular],
    });

    switch (title) {
      case 'Register':
        icon.addClass(FontAwesome.UserPlus);
        break;
      case 'Login':
        icon.addClass(FontAwesome.Key);
        break;
      case 'Profile':
        icon.addClass(FontAwesome.User);
        break;
      case 'Cart':
        icon.addClass(FontAwesome.Cart);
        break;
      default:
        break;
    }

    return icon;
  }
}
