import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import createLink from '../../../utils/create-link';
import AppRouter from '../../router/router';
import { AppLink } from '../../router/router-types';
import RoutedComponent from '../routed-component';
import courseLinkHtml from './course-link.html';

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

  public constructor(router: AppRouter, appName: string, appDescription: string) {
    super(Footer.FOOTER_PARAMS);

    this.router = router;

    this.shopSection = this.createShopSection(appName, appDescription);
    this.append(this.shopSection);

    this.courseLinkSection = DOMComponent.FromHTML(courseLinkHtml);
    this.append(this.courseLinkSection);
  }

  private createShopSection(appName: string, appDescription: string): DOMComponent<HTMLElement> {
    const shopSection = new DOMComponent<HTMLElement>(Footer.SHOP_SECTION_PARAMS);
    shopSection.append(this.createAppDescriptionRow(appName, appDescription));

    shopSection.append(this.createLinksRow('Useful Links', Footer.NAVIGATION_LINKS));

    return shopSection;
  }

  private createAppDescriptionRow(appName: string, appDescription: string): DOMComponent<HTMLElement> {
    const appInfoRow = new DOMComponent<HTMLElement>({
      classList: [FooterCssClasses.ShopInfoWrapper],
    });
    const appNameLabel = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [FooterCssClasses.ShopNameLabel],
      textContent: appName,
    });
    const appDescriptionLabel = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [FooterCssClasses.ShopDescriptionLabel],
      textContent: appDescription,
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
      const link = createLink(
        {
          classList: [FooterCssClasses.Link],
          textContent: url.replace('-', ' '),
        },
        this.router,
        url
      );
      this.links.set(url as AppLink, link);
      return link;
    });

    linksRow.append(linksTitle, ...linkElements);
    return linksRow;
  }
}
