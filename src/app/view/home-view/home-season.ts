import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';

enum SectionSeasonCssClasses {
  SectionSeason = 'section__season',
  TitleSeason = 'title__season',
  BtnSeason = 'btn__season',
}

export default class HomeSeasonSection extends DOMComponent<HTMLElement> {
  private static SEASON_SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SectionSeasonCssClasses.SectionSeason],
  };

  public constructor() {
    super(HomeSeasonSection.SEASON_SECTION_PARAMS);
    const titleSectionSeason = new DOMComponent<HTMLParagraphElement>({
      tag: Tags.Paragraph,
      classList: [SectionSeasonCssClasses.TitleSeason],
      textContent: 'AUTUMN COLLECTION 2023',
    });
    const btnSectionSeason = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [SectionSeasonCssClasses.BtnSeason],
      textContent: 'SHOP NOW',
      attributes: {
        type: 'button',
      },
    });
    this.append(titleSectionSeason);
    this.append(btnSectionSeason);
  }
}
