// pagination.js
// Імпортуєм бібліотеку tui-pagination в проект:
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
  // firstItemClassName: 'tui-first-child',
  // lastItemClassName: 'tui-last-child',
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
    // moreButton:
    //   '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
    //   '<span class="tui-ico-ellip">...</span>' +
    //   '</a>',
  },
  // onPageClick: function (page) {
  //     // Функція, яка виконується при кліку на сторінку
  //     return 'http://example.com/page=' + page;
  //   },
};
export const pagination = new Pagination(container, options);

pagination.on('beforeMove', async evt => {
  currentPage = evt.page;
  const movies = await searchTrending(currentPage);
  renderCardMarkup(movies);
});

const clearHTML = () => {
  pagination.innerHTML = '';
};
// For each custom event, the page number is returned in the eventData object, and false in the beforeMove event is canceled. (The afterMove event also does not fired)
// якщо ви зберігаєте дані у змінній myData, ви можете оновити сторінку після вибору сторінки в пагінації
// pagination.on('beforeMove', evt => {
//   const { page } = evt;

//   // Розрахунок індексів елементів для відображення на сторінці
//   const startIndex = (page - 1) * options.itemsPerPage;
//   const endIndex = startIndex + options.itemsPerPage;

//   // Отримання елементів для відображення на сторінці
//   const pageData = myData.slice(startIndex, endIndex);

//   // Оновлення списку елементів у вашому інтерфейсі
//   updateMyInterface(pageData);

//   // Повертаємо false, щоб скасувати стандартну поведінку пагінації
//   return false;
// });

// pagination.on('afterMove', ({ page }) => console.log(page));

// pagination.on('afterMove', ({ page }) => console.log(page));

// const pagination = new Pagination(container, options);

// // const items = [...]; // масив елементів

// function displayItems(page) {
//   const startIndex = (page - 1) * options.itemsPerPage;
//   const endIndex = startIndex + options.itemsPerPage;
//   const pageItems = items.slice(startIndex, endIndex);
// }

// myData = [
//   /* нові дані */
// ];

// pagination.setTotalItems(myData.length);
// pagination.movePageTo(1);
