import * as API from './api';
import { renderCardMarkup } from './render-markup';

const cardList = document.querySelector(`.moviesgallery-box`);

//=======================================================
// // приклад запросу через api
// import * as API from './api';

window.addEventListener('load', event => {
  try {
    API.searchTrending(1)
      .then(res => {
        return renderCardMarkup(res);
      })
      .then(res => {
        return (cardList.innerHTML = res);
      });
  } catch (error) {
    console.log(error);
  }
});

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
