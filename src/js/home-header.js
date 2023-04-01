// home-header.js
import { searchMovieTitle } from './api';
import { renderCardMarkup } from './render-markup';
import { pagination } from './pagination';
import { scrollToTop } from './scrollToTop';

const formEl = document.querySelector('.header__form');
const inputForm = document.querySelector('.header__form-input');
// const searchIcon = document.querySelector('.header__form-button');
const errorText = document.querySelector('.header__form-text');

formEl.addEventListener('submit', onSubmitForm);
async function onSubmitForm(e) {
  e.preventDefault();
  const text = e.target.elements['movie-search'].value;
  if (!text) {
    return errorText.classList.remove('visually-hidden');
  }
  errorText.classList.add('visually-hidden');
  try {
    const response = await searchMovieTitle(text, 1);
    if (response.results.length === 0) {
      return errorText.classList.remove('visually-hidden');
    }
    const totalItems = response.total_results;
    // Скидаємо пагінацію для пошуку за замовчуванням
    pagination.off();
    renderCardMarkup(response);
    // Додаємо обробник події пагінації для пошуку за назвою
    pagination.reset(totalItems);
    pagination.on('beforeMove', async evt => {
      scrollToTop();
      const currentPage = evt.page;
      const response = await searchMovieTitle(text, currentPage);
      renderCardMarkup(response);
    });
  } catch (error) {
    console.log(error);
  }
  inputForm.value = "";
}

// const fetchMovies = name => {
//     return fetch(
//        `/search/movie?api_key=${API_KEY}&page=${page}&language=en-US&include_adult=false&query=${title}`
//     ).then(response => {
//         if (!response.ok) {
//             if (response.status === 404) {
//                 return [];
//             }
//             throw new Error(response.status);
//         }
//         return response.json();
//     })
//         .catch(error => {
//             console.error(error);
//         });
// };
// formEl.addEventListener('submit', (e => {
//   const trimmedValue = e.target.elements['movie-search'].value.trim();

//   if (trimmedValue !== '') {
//     fetchMovies(trimmedValue).then(foundData => {
//       if (foundData.length > 0) {
//         renderCardMarkup(foundData);
//       }
//       // } else if (foundData.length === 0) {
//       //   return errorText.classList.remove('visually-hidden');
//       // }
//     });
//   };
// }))

