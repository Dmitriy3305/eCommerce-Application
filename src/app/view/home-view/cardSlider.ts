import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';

enum CardSliderCssClasses {
  NameContainerProduct = 'swiper-slide',
  NameImgContainer = 'image-slider__image',
  NameProduct = 'name__product',
}

export default class CardSlider extends DOMComponent<HTMLElement> {
  public static PHOTO_CONTENT_SLIDER: ElementParameters = {
    tag: Tags.Div,
    classList: [CardSliderCssClasses.NameContainerProduct],
  };

  public constructor(url: string, name: string) {
    super(CardSlider.PHOTO_CONTENT_SLIDER);
    const imgProductContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [CardSliderCssClasses.NameImgContainer],
    });
    const imgProduct = new DOMComponent<HTMLImageElement>({
      tag: Tags.Image,
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
    this.append(imgProductContainer, nameProduct);
    imgProductContainer.append(imgProduct);
  }
}
