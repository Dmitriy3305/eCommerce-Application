import { Tags } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';

enum SeasonCssClasses {
  SectionSeason = 'section__season',
  TitleSeason = 'title__season',
  BtnSeason = 'btn__season',
}

export default class SeasonProducts extends DOMComponent<HTMLElement> {
  public static SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SeasonCssClasses.SectionSeason],
  };

  public static TITLE_SEASON: ElementParameters = {
    tag: Tags.Paragraph,
    classList: [SeasonCssClasses.TitleSeason],
    textContent: `SPRING COLLECTION 2023`,
  };

  public static BTN_SEASON: ElementParameters = {
    tag: Tags.Button,
    classList: [SeasonCssClasses.BtnSeason],
    textContent: `SHOW NOW`,
    attributes: {
      type: 'button',
    },
  };
}
