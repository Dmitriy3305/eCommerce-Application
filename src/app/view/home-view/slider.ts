import Swiper from 'swiper';
import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppRouter from '../../router/router';
import ProductsRepository from '../../api/products';
import swiperHomePage from './param-slider';
import ProductCard from '../product-card';

enum SliderCssClasses {
  NameSection = 'section__slider',
  NameTitle = 'title__slider',
  NameContainer = 'swiper-container',
  WrapperPhoto = 'swiper-wrapper',
  NameLeftBtn = 'swiper-button-prev',
  NameRightBtn = 'swiper-button-next',
  Slide = 'swiper-slide',
}

export default class Slider extends DOMComponent<HTMLElement> {
  public static SECTION_SLIDER_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SliderCssClasses.NameSection],
  };

  private sliderWrapper: DOMComponent<HTMLDivElement>;

  private router: AppRouter;

  public constructor(router: AppRouter) {
    super(Slider.SECTION_SLIDER_PARAMS);

    this.router = router;

    const titleSlider = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading2,
      classList: [SliderCssClasses.NameTitle],
      textContent: `Choose your perfect \npair of shoes`,
    });
    const container = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.NameContainer],
    });
    this.sliderWrapper = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.WrapperPhoto],
    });
    const leftBtn = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.NameLeftBtn],
    });
    const rightBtn = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.NameRightBtn],
    });
    this.append(titleSlider, container);
    container.append(this.sliderWrapper, leftBtn, rightBtn);
    this.showSlider();
  }

  public showSlider(): void {
    const productsRepository = new ProductsRepository();
    productsRepository.filterProducts().then((response) => {
      this.sliderWrapper.append(
        ...response.map((product) => {
          const card = new ProductCard(this.router, product);
          card.addClass(SliderCssClasses.Slide);
          return card;
        })
      );
      const slider = new Swiper('.swiper-container', swiperHomePage);
      slider.init();
    });
  }
}
