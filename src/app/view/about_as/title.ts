import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';

enum TitleCssClasses {
  Section = 'sections__title',
  Title = 'title',
}

export default class Title extends DOMComponent<HTMLElement> {
  private static TITLE_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [TitleCssClasses.Section],
  };

  public constructor() {
    super(Title.TITLE_PARAMS);
    const contentTitle = new DOMComponent<HTMLDivElement>({
      tag: Tags.Heading1,
      classList: [TitleCssClasses.Title],
      textContent: 'Our team',
    });
    this.append(contentTitle);
  }
}
