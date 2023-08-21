import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import card1 from '../../../assets/card_1.jpeg';
import card2 from '../../../assets/card2.jpg';
import card3 from '../../../assets/card3.jpg';
import CardSlider from './cardSlider';
import AppRouter from '../../router/router';

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

const imgSlider = [`${card1}`, `${card2}`, `${card3}`];

const sliderImageName = ['Converse Chuck Taylor', `Timberland 6`, 'Dr. Martens 1460'];

export default class Slider extends DOMComponent<HTMLElement> {
  public static SECTION_SLIDER_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SliderCssClasses.NameSection],
  };

  public constructor(router: AppRouter) {
    super(Slider.SECTION_SLIDER_PARAMS);
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
    const btnLeftSlider = new DOMComponent<HTMLButtonElement>({
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
    const sliderPhoto = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.NamePhotoContent],
    });
    const btnRightSlider = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Input,
      classList: [SliderCssClasses.NameBtn],
      attributes: {
        type: 'button',
        id: 'right',
      },
    });
    this.append(wrapperSlider);
    wrapperSlider.append(titleSlider, container);
    const cardProduct1 = new CardSlider(imgSlider[0], sliderImageName[0]);
    const cardProduct2 = new CardSlider(imgSlider[1], sliderImageName[1]);
    const cardProduct3 = new CardSlider(imgSlider[2], sliderImageName[2]);

    container.append(btnLeftSlider, wrapperPhoto, btnRightSlider);
    wrapperPhoto.append(sliderPhoto);
    sliderPhoto.append(cardProduct1, cardProduct2, cardProduct3);
  }

  public showSlider(): void {
    const cards = [];
    for (let i = 0; i < 3; i = +1) {
      const componentSlider = new CardSlider(imgSlider[i], sliderImageName[i]);
      cards.push(componentSlider);
    }
    console.log(cards);
  }
}
