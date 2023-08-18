import DOMComponent from '../../components/base-component';
import Feedback from '../../components/home-page/home-page-feedback';
import SeasonProducts from '../../components/home-page/home-page-season';
import SliderProducts, { SliderImage, SliderImageName } from '../../components/home-page/home-page-slider';
import { Events, Tags } from '../../types/dom-types/enums';
import AppView from './view';

export default class HomePageView extends AppView {
  private sectionSeason: DOMComponent<HTMLElement>;
  private sectionFeedback: DOMComponent<HTMLElement>;
  private section: DOMComponent<HTMLElement>;
  private wrapper: DOMComponent<HTMLDivElement>;
  private title: DOMComponent<HTMLHeadingElement>;
  private titleSeason: DOMComponent<HTMLParagraphElement>;
  private container: DOMComponent<HTMLDivElement>;
  private btnLeft: DOMComponent<HTMLButtonElement>;
  private btnRight: DOMComponent<HTMLButtonElement>;
  private btnSeason: DOMComponent<HTMLButtonElement>;
  private photoContent: DOMComponent<HTMLDivElement>;
  private textFeedback: DOMComponent<HTMLDivElement>;
  private containerImg: DOMComponent<HTMLDivElement>;
  private titleFeedback: DOMComponent<HTMLParagraphElement>;
  private feedback: DOMComponent<HTMLParagraphElement>;
  private authorFeedback: DOMComponent<HTMLParagraphElement>;
  private imgFeedback: DOMComponent<HTMLImageElement>;
  private wrapperPhoto: DOMComponent<HTMLDivElement>;
  public constructor(appName: string) {
    super(appName);
    this.sectionSeason = new DOMComponent<HTMLElement>({ ...SeasonProducts.SECTION_PARAMS, parent: this.main });
    this.section = new DOMComponent<HTMLElement>({ ...SliderProducts.SECTION_PARAMS, parent: this.main });
    this.sectionFeedback = new DOMComponent<HTMLElement>({ ...Feedback.SECTION_FEEDBACK, parent: this.main });
    this.wrapper = new DOMComponent<HTMLDivElement>({ ...SliderProducts.WRAPPER_PARAMS, parent: this.section });
    this.title = new DOMComponent<HTMLHeadingElement>({ ...SliderProducts.TITLE_PARAMS, parent: this.wrapper });
    this.titleSeason = new DOMComponent<HTMLParagraphElement>({
      ...SeasonProducts.TITLE_SEASON,
      parent: this.sectionSeason,
    });
    this.container = new DOMComponent<HTMLDivElement>({ ...SliderProducts.CONTAINER_PARAMS, parent: this.wrapper });
    this.btnLeft = new DOMComponent<HTMLButtonElement>({ ...SliderProducts.BTN_PARAMS, parent: this.container });
    this.btnSeason = new DOMComponent<HTMLButtonElement>({ ...SeasonProducts.BTN_SEASON, parent: this.sectionSeason });
    this.wrapperPhoto = new DOMComponent<HTMLDivElement>({ ...SliderProducts.WRAPPER_PHOTO, parent: this.container });
    this.photoContent = new DOMComponent<HTMLDivElement>({
      ...SliderProducts.BTN_PHOTO_CONTENT,
      parent: this.wrapperPhoto,
    });
    this.btnRight = new DOMComponent<HTMLButtonElement>({ ...SliderProducts.BTN_PARAMS, parent: this.container });
    this.textFeedback = new DOMComponent<HTMLDivElement>({ ...Feedback.TEXT_FEEDBACK, parent: this.sectionFeedback });
    this.containerImg = new DOMComponent<HTMLDivElement>({ ...Feedback.CONTENT_IMG, parent: this.sectionFeedback });
    this.titleFeedback = new DOMComponent<HTMLParagraphElement>({
      ...Feedback.TITLE_FEEDBACK,
      parent: this.textFeedback,
    });
    this.feedback = new DOMComponent<HTMLParagraphElement>({ ...Feedback.FEEDBACK, parent: this.textFeedback });
    this.authorFeedback = new DOMComponent<HTMLParagraphElement>({ ...Feedback.AUTHOR, parent: this.textFeedback });
    this.imgFeedback = new DOMComponent<HTMLImageElement>({ ...Feedback.IMG_FEEDBACK, parent: this.containerImg });
    this.showSlider();
  }

  public get pageName(): string {
    return 'home-page';
  }

  protected createMain(): DOMComponent<HTMLElement> {
    return new DOMComponent<HTMLElement>({
      tag: Tags.Main,
    });
  }
  public showSlider(): void {
    for (let i = 0; i < SliderImage.length; i++) {
      const products = new DOMComponent<HTMLDivElement>({ ...SliderProducts.PRODUCTS, parent: this.photoContent });
      const productImg = new DOMComponent<HTMLImageElement>({ ...SliderProducts.IMG_PRODUCT, parent: products });
      const nameProduct = new DOMComponent<HTMLParagraphElement>({
        ...SliderProducts.NAME_PRODUCT,
        parent: products,
      });
      productImg.setAttribute('src', `${SliderImage[i]}`);
      nameProduct.textContent = `${SliderImageName[i]}`;
    }
    const slider = document.querySelector('.slider__photo');
    let firstImage = document.querySelectorAll('.card__product')[0];
    let firstImgWidth = firstImage.clientWidth + 30;
    const btnScroll = document.querySelectorAll('.btn__arrow');
    this.btnLeft.setAttribute('id', 'left');
    this.btnRight.setAttribute('id', 'right');
    btnScroll.forEach((icon) => {
      icon.addEventListener(Events.Click, () => {
        (slider as HTMLDivElement).scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
        console.log(firstImgWidth);
      });
    });
  }
}
