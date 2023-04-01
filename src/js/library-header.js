// імпортуємо функції
import { addFilmToLs } from './storage-service';
import { removeFilmFromLs } from './storage-service';
import { getFilms } from './storage-service';

// створимо функцію handleClick, яку будемо викликати під час кліку на кнопку:
async function handleClick(event) {
  const key = event.target.dataset.action; // отримуємо значення data-action кнопки

  if (!key) return; // якщо значення не задано, нічого не робимо

  const films = await getFilms(key); // отримуємо масив фильмів з Local Storage по ключу

  // викликаємо функцію рендерінга розмітки, передаючи в неї масив фильмів
  renderMarkup(films);
}

// Знаходимо кнопки за атрибутами
// const buttonWatched = document.querySelector('button[data-action]');
// const buttonQueue = document.querySelector('button[data-action]');

// додаємо обробники кліка на кнопки, щоб викликати функцію
// buttonWatched.addEventListener('click', handleClick);
// buttonQueue.addEventListener('click', handleClick);
