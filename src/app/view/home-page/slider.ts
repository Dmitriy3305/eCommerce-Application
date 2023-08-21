import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import CardSlider from './cardSlider';
import AppRouter from '../../router/router';
import getProducts from '../../api/products';

enum SliderCssClasses {
  NameSection = 'section__slider',
  NameWrapper = 'wrapper__slider',
  NameTitle = 'title__slider',
  NameContainer = 'slider__container',
  NameBtn = 'btn__arrow',
  WrapperPhoto = 'wrapper__photo',
  NamePhotoContent = 'slider__photo',
  NameContainerProduct = 'card__product',
  NameImgProduct = 'slider__product',
  NameProduct = 'name__product',
}

export default class Slider extends DOMComponent<HTMLElement> {
  public static SECTION_SLIDER_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SliderCssClasses.NameSection],
  };

  private sliderPhoto: DOMComponent<HTMLDivElement>;

  private leftBtn: DOMComponent<HTMLButtonElement>;

  private rightBtn: DOMComponent<HTMLButtonElement>;

  private router: AppRouter;

  public constructor(router: AppRouter) {
    super(Slider.SECTION_SLIDER_PARAMS);

    this.router = router;
    const wrapperSlider = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.NameWrapper],
    });
    const titleSlider = new DOMComponent<HTMLHeadingElement>({
      tag: Tags.Heading2,
      classList: [SliderCssClasses.NameTitle],
      textContent: `Choose your perfect \npair of shoes`,
    });
    const container = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.NameContainer],
    });
    this.leftBtn = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Input,
      classList: [SliderCssClasses.NameBtn],
      attributes: {
        type: 'button',
        id: 'left',
      },
    });
    const wrapperPhoto = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.WrapperPhoto],
    });
    this.sliderPhoto = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.NamePhotoContent],
    });
    this.rightBtn = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Input,
      classList: [SliderCssClasses.NameBtn],
      attributes: {
        type: 'button',
        id: 'right',
      },
    });
    this.append(wrapperSlider);
    wrapperSlider.append(titleSlider, container);
    container.append(this.leftBtn, wrapperPhoto, this.rightBtn);
    wrapperPhoto.append(this.sliderPhoto);
    this.drawSlider();
  }

  public drawSlider(): void {
    const cards: string[] = [];
    const names: string[] = [];
    const cardsProduct = [];
    getProducts().then((response) => {
      const data = response.body.results;
      for (let i = 0; i < data.length; i += 1) {
        const { images } = data[i].masterData.current.masterVariant;
        const { name } = data[i].masterData.current;
        const urlImg = images ? images[0].url : '';
        const nameProduct = Object.values(name);
        cards.push(urlImg);
        names.push(nameProduct[0]);
        const cardSlider = new CardSlider(cards[i], names[i]);
        cardsProduct.push(cardSlider);
        this.sliderPhoto.append(cardSlider);
      }
    });
  }
}
