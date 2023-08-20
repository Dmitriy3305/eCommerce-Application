/* import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppView from '../view';
import imgFeedback from '../../../assets/feedback3.jpg';

enum FeedbackCssClasses {
  SectionFeedback = 'section__feedback',
  TextFeedback = 'content__feedback',
  TitleFeedback = 'title__feedback',
  Feedback = 'feedback',
  FeedbackAuthor = 'author',
  ContainerImg = 'content__img',
  ImgFeedback = 'img__feedback',
}

export default class Feedback extends AppView {
  private static SECTION_FEEDBACK_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [FeedbackCssClasses.SectionFeedback],
  };

  private sectionFeedback: DOMComponent<HTMLElement>;

  public constructor(appName: string, appDescription: string) {
    super(appName);
    this.sectionFeedback = this.createFeedbackSection(appName, appDescription);
    this.sectionFeedback.append(this.main);
  }

  public get pageName(): string {
    return 'home-page';
  }

  protected createMain(): DOMComponent<HTMLElement> {
    return new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
  }

  private createFeedbackSection(appName: string, appDescription: string): DOMComponent<HTMLElement> {
    const sectionFeedback = new DOMComponent<HTMLElement>(Feedback.SECTION_FEEDBACK_PARAMS);
    const contentFeedback = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [FeedbackCssClasses.TextFeedback],
    });
    const titleFeedback = new DOMComponent<HTMLParagraphElement>({
      tag: Tags.Paragraph,
      classList: [FeedbackCssClasses.TitleFeedback],
      textContent: '*****',
    });
    const feedback = new DOMComponent<HTMLParagraphElement>({
      tag: Tags.Paragraph,
      classList: [FeedbackCssClasses.Feedback],
      textContent: `"They have a very nice padding in the sole which makes it comfortable to wear for long periods of time and these shoes definitely fit very true to size."`,
    });
    const feedbackAuthor = new DOMComponent<HTMLParagraphElement>({
      tag: Tags.Paragraph,
      classList: [FeedbackCssClasses.FeedbackAuthor],
      textContent: `LEON`,
    });

    const feedbackImgContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [FeedbackCssClasses.ContainerImg],
    });
    const feedbackImg = new DOMComponent<HTMLImageElement>({
      tag: Tags.Image,
      classList: [FeedbackCssClasses.ImgFeedback],
      attributes: {
        src: imgFeedback,
        alt: `feedback`,
      },
    });
    this.main.append(sectionFeedback);
    sectionFeedback.append(contentFeedback, feedbackImgContainer);
    contentFeedback.append(titleFeedback, feedback, feedbackAuthor);
    feedbackImgContainer.append(feedbackImg);
    return sectionFeedback;
  }
}
*/
