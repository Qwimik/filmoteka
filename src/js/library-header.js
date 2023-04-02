// імпортуємо функції
import { addFilmToLs } from './storage-service';
import { removeFilmFromLs } from './storage-service';
import { getFilms } from './storage-service';
import { renderCardMarkup } from './render-markup';

// створимо функцію handleClick, яку будемо викликати під час кліку на кнопку:
async function handleClick(event) {
  const key = event.target.dataset.action; // отримуємо значення data-action кнопки

  if (!key) return; // якщо значення не задано, нічого не робимо

  const films = await getFilms(key); // отримуємо масив фильмів з Local Storage по ключу
  // console.log(key);
  // console.log(films);

  // викликаємо функцію рендерінга розмітки, передаючи в неї масив фильмів
  // renderCardMarkup(films);
}

// Знаходимо кнопки за атрибутами
const filter = document.querySelector('.filter__wrap');

if (filter) {
  const refs = {
    btnWatched: filter.querySelector('button[data-action="watchedFilms"]'),
    btnQueue: filter.querySelector('button[data-action="queueFilms"]'),
  };

  // console.log(refs.btnWatched.dataset.action);
  // console.log(refs.btnQueue.dataset.action);

  // додаємо обробники кліка на кнопки, щоб викликати функцію
  refs.btnWatched.addEventListener('click', handleClick);
  refs.btnQueue.addEventListener('click', handleClick);
}
