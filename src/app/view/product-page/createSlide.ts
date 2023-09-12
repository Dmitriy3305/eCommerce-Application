import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';

enum MiniSliderCssClasses {
  swiperSlide = 'swiper-slide',
  sliderImage = 'slider__image',
}

export default class Slide extends DOMComponent<HTMLElement> {
  public static SLIDE: ElementParameters = {
    tag: Tags.Div,
    classList: [MiniSliderCssClasses.swiperSlide],
  };

  public constructor(url: string) {
    super(Slide.SLIDE);
    this.addClass('mini-swiper-slide');
    const imgSlide = new DOMComponent<HTMLImageElement>({
      tag: Tags.Image,
      attributes: {
        src: url,
        alt: 'shoes',
      },
    });
    this.append(imgSlide);
  }
}
