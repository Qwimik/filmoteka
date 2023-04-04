import Splide from '@splidejs/splide';
// import '@splidejs/splide/css';

export const slider = new Splide('.splide', {
  type: 'loop',
  height: '2.5rem',
  focus: 'center',
  autoWidth: true,
  autoHeight: true,
  arrows: false,
  perPage: 5,
  gap: '0.2rem',
  breakpoints: {
    1280: {
      perPage: 8,
      //   gap: '.2rem',
      //   height: '2rem',
    },
    768: {
      perPage: 6,
      //   gap: '0.2rem',
      //   height: '2rem',
    },
  },
}).mount();
