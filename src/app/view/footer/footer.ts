import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
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

export default class Footer extends DOMComponent<HTMLElement> {
  private static FOOTER_PARAMS: ElementParameters = {
    tag: Tags.Footer,
    classList: [FooterCssClasses.Footer],
  };

  private static SHOP_SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [FooterCssClasses.ShopSection],
  };

  private shopSection: DOMComponent<HTMLElement>;

  private courseLinkSection: DOMComponent<HTMLElement>;

  public constructor(appName: string, appDescription: string) {
    super(Footer.FOOTER_PARAMS);

    this.shopSection = this.createShopSection(appName, appDescription);
    this.append(this.shopSection);

    this.courseLinkSection = DOMComponent.FromHTML(courseLinkHtml);
    this.append(this.courseLinkSection);
  }

  private createShopSection(appName: string, appDescription: string): DOMComponent<HTMLElement> {
    const shopSection = new DOMComponent<HTMLElement>(Footer.SHOP_SECTION_PARAMS);
    shopSection.append(this.createAppDescriptionRow(appName, appDescription));

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

    const linkElements = links.map(
      (url) =>
        new DOMComponent<HTMLAnchorElement>({
          tag: Tags.Anchor,
          classList: [FooterCssClasses.Link],
          textContent: url.substring(0),
          attributes: {
            href: url,
          },
        })
    );

    linksRow.append(linksTitle, ...linkElements);
    return linksRow;
  }
}
