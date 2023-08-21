import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppRouter from '../../router/router';

enum SectionSeasonCssClasses {
  SectionSeason = 'section__season',
  TitleSeason = 'title__season',
  BtnSeason = 'btn__season',
}

export default class Season extends DOMComponent<HTMLElement> {
  private static SEASON_SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SectionSeasonCssClasses.SectionSeason],
  };

  public constructor(router: AppRouter) {
    super(Season.SEASON_SECTION_PARAMS);
    const titleSectionSeason = new DOMComponent<HTMLParagraphElement>({
      tag: Tags.Paragraph,
      classList: [SectionSeasonCssClasses.TitleSeason],
      textContent: 'SPRING COLLECTION 2023',
    });
    const btnSectionSeason = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [SectionSeasonCssClasses.BtnSeason],
      textContent: 'SHOW NOW',
      attributes: {
        type: 'button',
      },
    });
    this.append(titleSectionSeason);
    this.append(btnSectionSeason);
  }
}
