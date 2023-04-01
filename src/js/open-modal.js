import * as API from './api';
import { Button } from './button';
import * as StorageService from './storage-service';

import {
  createModalMarkup,
  addTrailersMarkup,
} from './templates.js/modal-markup';

const modalBackdrop = document.querySelector('.modal__backdrop');
const modal = document.querySelector('.modal__wrapper');
const field = document.querySelector('.moviesgallery');
field.addEventListener('click', onCardClick);
let markup = ``;
let currentFilm = null;

function onCardClick(e) {
  const targetCard = e.target;
  const card = targetCard.closest('.moviesgallery-item');
  const cardId = card.dataset.id;

  // console.log(cardId);

  try {
    API.searchMovieId(cardId).then(res => {
      modalBackdrop.classList.remove('is-hidden');
      const markup = createModalMarkup(res);
      modal.innerHTML = markup;
      currentFilm = res;
      console.log(res);

      new Button('[data-list="watched"]', btnHandler);
      new Button('[data-list="queue"]', btnHandler);
    });
  } catch (error) {
    console.log(error);
  }
}

function btnHandler(e) {
  const button = e.target;
  const film = currentFilm;
  const storageKey =
    button.dataset.list === 'watched'
      ? StorageService.KEYS.WATCHED
      : StorageService.KEYS.QUEUE;
  const currentAction = button.dataset.action;

  switch (currentAction) {
    case 'remove': {
      StorageService.removeFilmFromLs(storageKey, film);
      button.dataset.action = 'add';
      button.textContent = 'Add to watched';
      break;
    }
    case 'add': {
      StorageService.addFilmToLs(storageKey, film);
      button.dataset.action = 'remove';
      button.textContent = 'Remove from watched';
      break;
    }

    default:
      return;
  }
}
