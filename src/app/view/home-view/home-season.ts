import DOMComponent, { ElementParameters } from '../../../components/base-component';
import RoutedLink from '../../../components/routed-link';
import { Tags } from '../../../types/dom-types/enums';
import AppRouter from '../../router/router';
import { AppLink } from '../../router/router-types';

enum SectionSeasonCssClasses {
  SectionSeason = 'section__season',
  TitleSeason = 'title__season',
  Promo = 'season__promo',
  BtnSeason = 'btn__season',
}

export default class HomeSeasonSection extends DOMComponent<HTMLElement> {
  private static SEASON_SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SectionSeasonCssClasses.SectionSeason],
  };

  public constructor(router: AppRouter) {
    super(HomeSeasonSection.SEASON_SECTION_PARAMS);
    const titleSectionSeason = new DOMComponent<HTMLParagraphElement>({
      tag: Tags.Paragraph,
      classList: [SectionSeasonCssClasses.TitleSeason],
      textContent: 'AUTUMN COLLECTION 2023',
    });

    const promo = new DOMComponent<HTMLSpanElement>({
      tag: Tags.Span,
      classList: [SectionSeasonCssClasses.Promo],
      textContent: '-20% for Travel shoes with promocode "TRAVEL"',
    });

    const btnSectionSeason = new RoutedLink(
      {
        classList: [SectionSeasonCssClasses.BtnSeason],
        textContent: 'SHOP NOW',
        attributes: {
          type: 'button',
        },
      },
      AppLink.Catalog,
      router
    );
    this.append(titleSectionSeason, promo, btnSectionSeason);
  }
}
