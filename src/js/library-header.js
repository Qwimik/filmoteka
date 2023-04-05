// імпортуємо функції
import { addFilmToLs } from './storage-service';
import { removeFilmFromLs } from './storage-service';
import { getFilms } from './storage-service';
import { renderCardMarkup } from './render-markup';
import { toCheckLibrary } from './check-watched';

// Знаходимо кнопки за атрибутами
const filter = document.querySelector('.filter__wrap');

// обираємо перелік карток, якщо вони є
const cardList = document.querySelector('[data-set="library-films"]');

// Якщо вони є вішаємо слухач події
if (filter) {
  filter.addEventListener('click', filterHandler);
}

async function filterHandler(e) {
  const currentBtn = e.target.closest('button');

  if (!currentBtn) {
    return;
  }

  const currentBtnAction = currentBtn.dataset.action;
  const oppositeBtn =
    currentBtnAction === 'watchedFilms'
      ? document.querySelector('[data-action="queueFilms"]')
      : document.querySelector('[data-action="watchedFilms"]');

  currentBtn.classList.add('active');
  oppositeBtn.classList.remove('active');

  renderActiveListFilms();

  currentBtn.blur();
}

export async function renderActiveListFilms() {
  const filter = document.querySelector('.filter__wrap');
  const activeButton = filter.querySelector('.active');

  const key = activeButton.dataset.action;
  const films = await getFilms(key);
  renderCardMarkup({ results: films });
  toCheckLibrary(cardList);
}
