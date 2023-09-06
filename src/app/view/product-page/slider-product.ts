import { Product } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { Thumbs, Navigation, Pagination } from 'swiper/modules';
import DOMComponent, { ElementParameters } from '../../../components/base-component';
import { Events, Tags } from '../../../types/dom-types/enums';
import Slide from './createSlide';

enum SliderCssClasses {
  wrapper = 'wrapper__product',
  SliderContainer = 'slider__product',
  SliderProduct = 'swiper',
  SwiperWrapper = 'swiper-wrapper',
  swiperContainer = 'swiper-container',
  mySwiperContainer = 'my-swiper-container',
  swiperSlide = 'swiper-slide',
  productButtonNext = 'swiper-button-next',
  productButtonPrev = 'swiper-button-prev',
  ModalProduct = 'modal__product',
  ModalContent = 'modal-content__product',
  ModalContainer = 'modal-container',
  BtnClose = 'btn-close-modal',
  bullet = 'swiper-pagination',
}

class Slider extends DOMComponent<HTMLElement> {
  public static PRODUCT_WRAPPER: ElementParameters = {
    tag: Tags.Div,
    classList: [SliderCssClasses.wrapper],
  };

  private swiperWrapper: DOMComponent<HTMLDivElement>;

  private swiperWrapper2: DOMComponent<HTMLDivElement>;

  private sliderProduct: DOMComponent<HTMLDivElement>;

  private modalProduct: DOMComponent<HTMLDivElement>;

  private modalContainer: DOMComponent<HTMLDivElement>;

  private btnClose: DOMComponent<HTMLButtonElement>;

  public constructor(product: Product) {
    super(Slider.PRODUCT_WRAPPER);
    const sliderContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.SliderContainer],
    });
    sliderContainer.addClass('slider-info__product');
    this.sliderProduct = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.SliderProduct],
    });
    this.sliderProduct.addClass('mySwiper2');
    this.swiperWrapper = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.SwiperWrapper],
    });
    const thumbsSlider = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.SliderProduct],
      attributes: {
        thumbsSlider: '',
      },
    });
    thumbsSlider.addClass('mySwiper');
    const mySwiperContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.mySwiperContainer],
    });
    const productButtonNext = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.productButtonNext],
      attributes: {
        id: 'right',
      },
    });
    const productButtonPrev = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.productButtonPrev],
      attributes: {
        id: 'left',
      },
    });

    this.swiperWrapper2 = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.SwiperWrapper],
    });
    this.modalProduct = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.ModalProduct],
    });
    const modalContent = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.SliderProduct],
    });
    modalContent.addClass(`${SliderCssClasses.ModalContent}`);

    this.modalContainer = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      attributes: {
        id: `${SliderCssClasses.ModalContainer}`,
      },
    });
    this.modalContainer.addClass('swiper-wrapper');
    this.btnClose = new DOMComponent<HTMLButtonElement>({
      tag: Tags.Button,
      classList: [SliderCssClasses.BtnClose],
      textContent: 'X',
    });
    const bullet = new DOMComponent<HTMLDivElement>({
      tag: Tags.Div,
      classList: [SliderCssClasses.bullet],
    });
    this.prepend(this.modalProduct);
    this.modalProduct.append(modalContent);
    modalContent.append(this.modalContainer, this.btnClose, bullet);
    this.append(sliderContainer);
    sliderContainer.append(mySwiperContainer, this.sliderProduct);
    mySwiperContainer.append(productButtonPrev, thumbsSlider, productButtonNext);
    this.sliderProduct.append(this.swiperWrapper);
    thumbsSlider.append(this.swiperWrapper2);
    this.showProductSlider(product);
    this.hiddenModal();
    this.showModal(product);
  }

  public showProductSlider(product: Product): void {
    const cards: string[] = [];
    const cardsProduct = [];
    const { images } = product.masterData.current.masterVariant;
    let countImages;
    if (images?.length === undefined) {
      countImages = 0;
    } else {
      countImages = images.length;
    }
    for (let i = 0; i < countImages; i += 1) {
      const imagesURL = images ? images[i].url : '';
      cards.push(imagesURL);
      const cardSlider = new Slide(cards[i]);
      const cardSliderMini = new Slide(cards[i]);
      cardsProduct.push(cardSlider);
      cardSlider.setAttribute('id', `${i + 1}`);
      this.swiperWrapper.append(cardSlider);
      this.swiperWrapper2.append(cardSliderMini);
    }

    setTimeout((): void => {
      const swiperProduct = new Swiper('.mySwiper', {
        loop: true,
        slidesPerView: 5,
        direction: 'vertical',
        spaceBetween: 10,
        freeMode: true,
        watchSlidesProgress: true,
      });
      const swiper2 = new Swiper('.mySwiper2', {
        modules: [Navigation, Thumbs],
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        loop: true,
        spaceBetween: 10,
        thumbs: {
          swiper: swiperProduct,
        },
      });
      swiper2.init();
    }, 0);
  }

  public openModal(): void {
    this.modalProduct.removeClass('modal_hidden');
    this.modalProduct.addClass('modal_active');
  }

  public showModal(product: Product): void {
    const cards: string[] = [];
    const cardsProduct = [];
    const variantsProduct = product.masterData.current.masterVariant.images;
    let countVariant;
    if (variantsProduct?.length === undefined) {
      countVariant = 0;
    } else {
      countVariant = variantsProduct?.length;
    }
    for (let i = 0; i < countVariant; i += 1) {
      const imagesURL = variantsProduct ? variantsProduct[i].url : '';
      cards.push(imagesURL);
      const cardSlider = new Slide(cards[i]);
      cardsProduct.push(cardSlider);
      this.modalContainer.append(cardSlider);
    }

    this.swiperWrapper.addEventListener(Events.Click, (event: Event) => {
      this.openModal();
      const { target } = event;
      const activeSlide = (target as Element).parentNode;
      const slideNumber: number = +(activeSlide as Element).id - 1;
      const modalSwiper = new Swiper(`.modal-content__product`, {
        modules: [Pagination],
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        spaceBetween: 30,
        initialSlide: slideNumber,
      });
      modalSwiper.update();
      this.btnClose.addEventListener(Events.Click, () => {
        this.hiddenModal();
        modalSwiper.destroy();
      });
    });
  }

  public hiddenModal(): void {
    this.modalProduct.addClass('modal_hidden');
    this.modalProduct.removeClass('modal_active');
  }

  public closeModal() {
    this.btnClose.addEventListener(Events.Click, () => {
      this.hiddenModal();
    });
  }
}
export default Slider;
