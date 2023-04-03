// pagination.js
// Імпортуєм бібліотеку tui-pagination з її стилями в проект:
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
// Імпортуєм запити:
import * as API from './api';
import { renderCardMarkup } from './render-markup';
// import { searchTrending, searchMovieId, searchMovieTitle } from './api';
import { scrollToTop } from './scrollToTop';
// Робимо екземпляр пагінації, вказавши контейнер та параметри:
const container = document.querySelector('#pagination');
const originalContainer = container;
// totalItems: загальна кількість елементів, які будуть розділені на сторінки.
// itemsPerPage: кількість елементів, які відображаються на одній сторінці.
// visiblePages: кількість сторінок, які відображаються одночасно в пагінації.
// onPageClick: функція, яка виконується при кліку на сторінку. У параметрі page передається номер клікнутої сторінки.
const options = {
  totalItems: 400,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
export const pagination = new Pagination(container, options);
// Функція обробник події для пошуку за замовчуванням
export function renderStartPagination(totalItems) {
  pagination.on('beforeMove', async evt => {
    scrollToTop();
    const currentPage = evt.page;
    const response = await API.searchTrending(currentPage);
    renderCardMarkup(response);
  });
}

// const paginationOff = () => {
//   alert('please work');
//   const newContainer = container.cloneNode(false);
//   container.parentNode.replaceChild(newContainer, container);
//   originalContainer = container;
//   container = newContainer;
// };

// const paginationOff = () => {
//   alert('please work');
//   // container.innerHTML = '';
//   document.querySelector('#paginationWrapper').style.display = 'none';
// };

// const paginationOff = () => {
//   document.getElementById('pagination').classList.add('visually-hidden');

//   document.querySelector('#pagination').style.display = 'none';
//   // libraryOn.removeEventListener('click', paginationOff);
// };

// libraryOn.addEventListener('click', paginationOff);
// const paginationOff = () => {
//   pagination.off();
//   pagination.destroy();
//   pagination.hide();
//   pagination.disable();
// };
const paginationOff = () => {
  pagination.destroy();
  // delete document.querySelector('#pagination');
  // if (container) {
  //   alert('please work');
  //   container.remove();
  //   console.log(container);
  //   container.innerHTML = '';
  //   console.log(pagination);
  //   pagination.destroy();
  //   console.log(pagination);
  // }
};

const libraryOn = document.querySelector('#btnLibrary');

libraryOn.addEventListener('click', paginationOff);

// libraryOn.addEventListener('click', () => {
//   alert('please work');
//   document.querySelector('#paginationWrapper').style.display = 'none';
//   pagination.hide();
// });
