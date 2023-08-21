import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import imgFeedback from '../../../assets/feedback3.jpg';
import AppRouter from '../../router/router';

enum FeedbackCssClasses {
  SectionFeedback = 'section__feedback',
  TextFeedback = 'content__feedback',
  TitleFeedback = 'title__feedback',
  Feedback = 'feedback',
  FeedbackAuthor = 'author',
  ContainerImg = 'content__img',
  ImgFeedback = 'img__feedback',
}

export default class Feedback extends DOMComponent<HTMLElement> {
  private static SECTION_FEEDBACK_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [FeedbackCssClasses.SectionFeedback],
  };
  private router: AppRouter;

  public constructor(router: AppRouter) {
    super(Feedback.SECTION_FEEDBACK_PARAMS);
    this.router = router;
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
    this.append(contentFeedback, feedbackImgContainer);
    contentFeedback.append(titleFeedback, feedback, feedbackAuthor);
    feedbackImgContainer.append(feedbackImg);
  }
}
