import { SwiperOptions } from 'swiper/types';
import { Navigation } from 'swiper/modules';

const swiperHomePage: SwiperOptions = {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  loop: true,
  autoHeight: true,
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 30,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
};

export default swiperHomePage;
