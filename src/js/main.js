import * as API from './api';
import { renderCardMarkup } from './render-markup';
import { pagination } from './pagination';
import { scrollToTop } from './scrollToTop';
import { renderStartPagination } from './pagination';
import { renderActiveListFilms } from './library-header';
import { addSpinnerTo } from './spinner';

const cardList = document.querySelector(`.moviesgallery-box`);

// Перевірка чи знаходимось ми на сторінці Home
const isHome = document.querySelector('#home');
const isLibrary = document.querySelector('#library');

// пошук та рендер за замовчуванням головної сторінки при загрузці
if (isHome) {
  window.addEventListener('load', event => {
    addSpinnerTo('.moviesgallery', 'moviesgallery-spinner');
    try {
      API.searchTrending(1).then(res => {
        const totalItems = res.total_results;
        renderCardMarkup(res);
        renderStartPagination(totalItems);
        if (res.results.length === 0) {
          // Прибираємо пагінацію, якщо результати відсутні
          pagination.destroy();
        }
      });
    } catch (error) {
      console.log(error);
    }
  });
}

if (isLibrary) {
  renderActiveListFilms();
}

// // приклад запросу через api
// import * as API from './api';

// window.addEventListener('load', event => {
//   try {
//     API.searchTrending(1)
//       .then(res => {
//         return renderCardMarkup(res);
//       })
//       .then(res => {
//         return (cardList.innerHTML = res);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

// function cardMarkup(data) {}

// try {
//   API.searchMovieId(76600).then(res => {
//     // 76600 - це id фільму для модалки
//     // тут рисуємо інтерфейс
//     console.log(res);
//   });
// } catch (error) {
//   console.log(error);
// }

// try {
//   API.searchMovieTitle('Avatar', 2).then(res => {
//     // 'Avatar' - це з інпуту назва фільму, який шукаємо
//     // 2 - це сторінка запиту (page)
//     // тут рисуємо інтерфейс
//     console.log(res);
//   });
// } catch (error) {
//   console.log(error);
// }
// =======================================================
