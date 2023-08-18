import { Tags } from '../../types/dom-types/enums';
import DOMComponent, { ElementParameters } from '../base-component';

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
  CardLeft = 'card__left',
  CardActive = 'card__active',
  CardRight = 'card__right',
}

export const SliderImage = [
  'https://27b9bdbb9ba55eab1df9-384a900a466f41940c55a8d482589ab4.ssl.cf3.rackcdn.com/1-Pa9v6Y-O.png',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/1/6/16-03-23-JF_TB0100617131_2_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/0/1/01-03-2023-JD_30592001_2_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/2/1/21-07-23-TC_DU02C5800-DOES1-911_2_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/2/9/29-06-2023-JC_IG1024_2_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/2/7/27-07-2023-LB_ASTR-AW23-DKF-419_2_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/2/4/24-10-22_JF_54321369_2_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/2/1/21-06-2023-JC_1024535_2_1.jpg',
  'https://27b9bdbb9ba55eab1df9-384a900a466f41940c55a8d482589ab4.ssl.cf3.rackcdn.com/2-HGpHpgPD.png',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/1/2/12-07-23-JF_113989-BRN_1_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/0/9/09_08_2023_JD_A04609C_1_1.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/2/6/26-05-2022_ec_dr7515-200_2.jpg',
  'https://media.endclothing.com/media/f_auto,q_auto:eco,w_1600/prodmedia/media/catalog/product/1/3/13-03-2023-GH_TB0915662311_1_1.jpg',
];

export const SliderImageName = [
  'Converse Chuck Taylor',
  `Timberland 6'`,
  'Dr. Martens 1460',
  'Rick Owens Sneakers',
  'Adidas Samba OG',
  'Astorflex Dukeflex',
  'Moonstar Gym Court',
  'Birkenstock Kyoto',
  'YEEZY BOOST 700',
  'Grenson Brady',
  'Converse Cons',
  'Nike x Travis',
  'Timberland Euro Hiker',
];
export default class SliderProducts extends DOMComponent<HTMLElement> {
  public static SECTION_PARAMS: ElementParameters = {
    tag: Tags.Section,
    classList: [SliderCssClasses.NameSection],
  };

  public static WRAPPER_PARAMS: ElementParameters = {
    tag: Tags.Div,
    classList: [SliderCssClasses.NameWrapper],
  };

  public static TITLE_PARAMS: ElementParameters = {
    tag: Tags.Heading2,
    classList: [SliderCssClasses.NameTitle],
    textContent: `Choose your perfect \npair of shoes`,
  };

  public static CONTAINER_PARAMS: ElementParameters = {
    tag: Tags.Container,
    classList: [SliderCssClasses.NameContainer],
  };

  public static BTN_PARAMS: ElementParameters = {
    tag: Tags.Button,
    classList: [SliderCssClasses.NameBtn],
    attributes: {
      type: 'button',
    },
  };

  public static WRAPPER_PHOTO: ElementParameters = {
    tag: Tags.Div,
    classList: [SliderCssClasses.WrapperPhoto],
  };

  public static BTN_PHOTO_CONTENT: ElementParameters = {
    tag: Tags.Div,
    classList: [SliderCssClasses.NamePhotoContent],
  };

  public static PRODUCTS: ElementParameters = {
    tag: Tags.Div,
    classList: [SliderCssClasses.NameContainerProduct],
  };

  public static IMG_PRODUCT: ElementParameters = {
    tag: Tags.Image,
    classList: [SliderCssClasses.NameImgProduct],
    attributes: {
      alt: 'shoes',
    },
  };

  public static NAME_PRODUCT: ElementParameters = {
    tag: Tags.Paragraph,
    classList: [SliderCssClasses.NameProduct],
  };
}
