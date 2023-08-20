/* import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';

enum SectionSeasonCssClasses {
  SectionSeason = 'section__season',
  TitleSeason = 'title__season',
  BtnSeason = 'btn__season',
}

export default class Season extends AppView {
  private static SEASON_SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SectionSeasonCssClasses.SectionSeason],
  };

  private sectionSeason: DOMComponent<HTMLElement>;

  public constructor(appName: string, appDescription: string) {
    super(appName);
    this.sectionSeason = this.createSeasonSection(appName, appDescription);
    this.main.append(this.sectionSeason);
  }

  public get pageName(): string {
    return 'home-page';
  }

  protected createMain(): DOMComponent<HTMLElement> {
    return new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
  }

  private createSeasonSection(appName: string, appDescription: string): DOMComponent<HTMLElement> {
    const sectionSeason = new DOMComponent<HTMLElement>(Season.SEASON_SECTION_PARAMS);
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
    this.main.append(this.sectionSeason);
    sectionSeason.append(titleSectionSeason);
    sectionSeason.append(btnSectionSeason);
    return sectionSeason;
  }
}
*/
