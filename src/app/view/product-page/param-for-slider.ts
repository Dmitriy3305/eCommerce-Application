import { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';
import { Thumbs, Navigation } from 'swiper/modules';

const paramSwiperProduct: SwiperOptions = {
  direction: 'vertical',
  loop: true,
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
};
const swiperProduct = new Swiper(`.mySwiper`, paramSwiperProduct);

const paramForSwiper2: SwiperOptions = {
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
};

export default paramForSwiper2;
