import { Tags } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';
import feedbackImg from '../../assets/feedback3.jpg';

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
  public static SECTION_FEEDBACK: ElementParameters = {
    tag: Tags.Section,
    classList: [FeedbackCssClasses.SectionFeedback],
  };

  public static TEXT_FEEDBACK: ElementParameters = {
    tag: Tags.Div,
    classList: [FeedbackCssClasses.TextFeedback],
  };

  public static TITLE_FEEDBACK: ElementParameters = {
    tag: Tags.Paragraph,
    classList: [FeedbackCssClasses.TitleFeedback],
    textContent: `*****`,
  };

  public static FEEDBACK: ElementParameters = {
    tag: Tags.Paragraph,
    classList: [FeedbackCssClasses.Feedback],
    textContent: `"They have a very nice padding in the sole which makes it comfortable to wear for long periods of time and these shoes definitely fit very true to size."`,
  };

  public static AUTHOR: ElementParameters = {
    tag: Tags.Paragraph,
    classList: [FeedbackCssClasses.FeedbackAuthor],
    textContent: `LEON`,
  };

  public static CONTENT_IMG: ElementParameters = {
    tag: Tags.Div,
    classList: [FeedbackCssClasses.ContainerImg],
  };

  public static IMG_FEEDBACK: ElementParameters = {
    tag: Tags.Image,
    classList: [FeedbackCssClasses.ImgFeedback],
    attributes: {
      src: feedbackImg,
      alt: 'photo_feedback',
    },
  };
}
