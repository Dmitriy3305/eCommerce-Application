import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppRouter from '../../router/router';
import { AppLink } from '../../router/router-types';
import RoutedComponent from '../../../components/routed-component';
import courseLinkHtml from './course-link.html';
import { AppInfo } from '../../../types/app-parameters';
import RoutedLink from '../../../components/routed-link';

enum FooterCssClasses {
  Footer = 'footer',
  ShopSection = 'footer__shop-info-links',
  CourseLinkSection = 'footer__course-link',
  ShopInfoWrapper = 'shop-info',
  ShopNameLabel = 'shop-info__name',
  ShopDescriptionLabel = 'shop-info__description',
  LinksRow = 'shop-links',
  LinksRowTitle = 'shop-links__title',
  Link = 'shop-link',
}

export default class Footer extends RoutedComponent {
  private static FOOTER_PARAMS: ElementParameters = {
    tag: Tags.Footer,
    classList: [FooterCssClasses.Footer],
  };

  private static SHOP_SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [FooterCssClasses.ShopSection],
  };

  public static NAVIGATION_LINKS = [AppLink.AboutUs, AppLink.Catalog];

  private shopSection: DOMComponent<HTMLElement>;

  private courseLinkSection: DOMComponent<HTMLElement>;

  private router: AppRouter;

  public constructor(router: AppRouter, appInfo: AppInfo) {
    super(Footer.FOOTER_PARAMS);

    this.router = router;

    this.shopSection = this.createShopSection(appInfo);
    this.append(this.shopSection);

    this.courseLinkSection = DOMComponent.FromHTML(courseLinkHtml);
    this.append(this.courseLinkSection);
  }

  private createShopSection(appInfo: AppInfo): DOMComponent<HTMLElement> {
    const shopSection = new DOMComponent<HTMLElement>(Footer.SHOP_SECTION_PARAMS);
    shopSection.append(this.createAppDescriptionRow(appInfo));

    shopSection.append(this.createLinksRow('Useful Links', Footer.NAVIGATION_LINKS));

    return shopSection;
  }

  private createAppDescriptionRow(appInfo: AppInfo): DOMComponent<HTMLElement> {
    const appInfoRow = new DOMComponent<HTMLElement>({
      classList: [FooterCssClasses.ShopInfoWrapper],
    });
    const appNameLabel = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [FooterCssClasses.ShopNameLabel],
      textContent: appInfo.name,
    });
    const appDescriptionLabel = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [FooterCssClasses.ShopDescriptionLabel],
      textContent: appInfo.description,
    });
    appInfoRow.append(appNameLabel, appDescriptionLabel);
    return appInfoRow;
  }

  private createLinksRow(title: string, links: string[]): DOMComponent<HTMLElement> {
    const linksRow = new DOMComponent<HTMLElement>({
      classList: [FooterCssClasses.LinksRow],
    });

    const linksTitle = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [FooterCssClasses.LinksRowTitle],
      textContent: title,
    });

    const linkElements = links.map((url) => {
      const link = new RoutedLink(
        {
          classList: [FooterCssClasses.Link],
          textContent: url.replace('-', ' '),
        },
        url,
        this.router
      );
      this.links.set(url as AppLink, link);
      return link;
    });

    linksRow.append(linksTitle, ...linkElements);
    return linksRow;
  }
}
