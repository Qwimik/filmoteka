// pagination.js
// Імпортуєм бібліотеку tui-pagination з її стилями в проект:
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
// Імпортуєм запити:
import * as API from './api';
import { renderCardMarkup } from './render-markup';
import { searchTrending, searchMovieId, searchMovieTitle } from './api';
// Робимо екземпляр пагінації, вказавши контейнер та параметри:
const container = document.getElementById('pagination');
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

// Додаємо обробник події
pagination.on('beforeMove', async evt => {
  // Переміщуємось наверх сторінки
  scrollToTop();
  // Отримуємо номер поточної сторінки:
  currentPage = evt.page;
  // Отримуємо елементи для нової сторінки:
  const movies = await searchTrending(currentPage);
  // Рендеримо отримані елементи:
  renderCardMarkup(movies);
});
// Reset pagination за потреби:
pagination.reset();
// повна очистка пагінації:
const clearHTMLPagination = () => {
  pagination.innerHTML = '';
};
// Функція для переміщення наверх сторінки
function scrollToTop() {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
// paganation.on('afterMove', event => {
//   const currentPage = event.page;
//   console.log(currentPage);
// });
