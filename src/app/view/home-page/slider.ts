import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Tags } from '../../../types/dom-types/enums';
import AppRouter from '../../router/router';
import card1 from '../../../assets/card_1.jpeg';
import card2 from '../../../assets/card2.jpg';
import card3 from '../../../assets/card3.jpg';
import CardSlider from './cardSlider';

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
    const card1 = new CardSlider(imgSlider[0], sliderImageName[0]);
    const card2 = new CardSlider(imgSlider[1], sliderImageName[1]);
    const card3 = new CardSlider(imgSlider[2], sliderImageName[2]);

    container.append(btnLeftSlider, wrapperPhoto, btnRightSlider);
    wrapperPhoto.append(sliderPhoto);
    sliderPhoto.append( card1, card2, card3);
  }

 public showSlider(): void {
    let cards = [];
    for (let i = 0; i < 3; i= +1) {
      const componentSlider = new CardSlider(imgSlider[i], sliderImageName[i]);
      cards.push(componentSlider);
    }
    console.log(cards);
  } 

  // getProduct() {
  // const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'ecommerce-application2023q1' });
  // const getProducts = async () => {
  // return apiRoot.products().get().execute();
  // };
  // getProducts()
  // .then((response) => {
  //  const data = response.body.results;
  // for(let i = 0; i < 15; i = +1) {
  //    const images = data[i].masterData.current.masterVariant.images;
  //   console.log(images);
  // }

  // for(let i = 0; i < 15; i = +1) {
  // const urlImg = data[i].masterData.current.masterVariant.images;
  // console.log(urlImg);
  // sliderImage.push(data[i].masterData.current.masterVariant.images[0].url)
  // }
  // console.log(sliderImage);
  // data.map(item => sliderImage.push(item.masterData.current.masterVariant.images[1].url))
  // console.log(sliderImage);
  // })
  // console.log(data[2].masterData.current.masterVariant.images[1].url);
  // for(let i = 0; i < data.length, i = +1;) {
  // const url = data[i].masterData.current.masterVariant.images[1].url)
  // const componentSlider = new CardSlider(url, name);
  // }
}
