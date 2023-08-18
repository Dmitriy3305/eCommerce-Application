import Navigation from '../../../components/navigation';
import { LinkCreateCallback } from '../../../types/header-types';
import capitalizeString from '../../../utils/capitalize-string';
import { getEnumKey } from '../../../utils/enum-utils';
import getLinkIcon from '../../../utils/get-link-icon';
import AppRouter from '../../router/router';
import { AppLink } from '../../router/router-types';

export default class UserNavigation extends Navigation {
  private linkDescriptions: AppLink[];

  public constructor(router: AppRouter, links: AppLink[], callback: LinkCreateCallback) {
    super(links, router);
    this.linkDescriptions = links;

    this.links.forEach((link, index) => {
      const currentLink = link;

      const linkTitle = capitalizeString(links[index]);
      currentLink.setAttribute('title', linkTitle);

      currentLink.append(getLinkIcon(linkTitle));

      callback(links[index], link);
    });
  }

  public addLinkTexts(): void {
    const descriptions = this.linkDescriptions.map((link) => getEnumKey(AppLink, link) || '???');
    this.links.forEach((link, index) => link.addText(descriptions[index]));
  }

  public removeLinkTexts(): void {
    this.links.forEach((link) => {
      link.removeText();
    });
  }
}
