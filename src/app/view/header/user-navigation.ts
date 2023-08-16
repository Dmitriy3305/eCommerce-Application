import Navigation from '../../../components/navigation';
import capitalizeString from '../../../utils/capitalize-string';
import getLinkIcon from '../../../utils/get-link-icon';

export default class UserNavigation extends Navigation {
  public constructor() {
    // TODO: URLs should be loaded from router
    const urls = ['/register', '/login', '/cart'];
    super(urls);

    this.links.forEach((link, index) => {
      const currentLink = link;

      const linkTitle = capitalizeString(urls[index].substring(1));
      currentLink.setAttribute('title', linkTitle);

      currentLink.append(getLinkIcon(linkTitle));
    });
  }

  public addLinkTexts(texts: string[]): void {
    this.links.forEach((link, index) => link.addText(texts[index]));
  }
}
