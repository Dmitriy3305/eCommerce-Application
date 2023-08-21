import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';

enum CardSliderCssClasses {
  NameContainerProduct = 'card__product',
  NameImgProduct = 'slider__product',
  NameProduct = 'name__product',
}

export default class CardSlider extends DOMComponent<HTMLElement> {
  public static PHOTO_CONTENT_SLIDER: ElementParameters = {
    tag: Tags.Div,
    classList: [CardSliderCssClasses.NameContainerProduct],
  };

  public constructor(url: string, name: string) {
    super(CardSlider.PHOTO_CONTENT_SLIDER);
    const imgProduct = new DOMComponent<HTMLImageElement>({
      tag: Tags.Image,
      classList: [CardSliderCssClasses.NameImgProduct],
      attributes: {
        src: url,
        alt: 'shoes',
      },
    });
    const nameProduct = new DOMComponent<HTMLImageElement>({
      tag: Tags.Paragraph,
      classList: [CardSliderCssClasses.NameProduct],
      textContent: name,
    });
    this.append(imgProduct, nameProduct);
    return this;
  }
}
