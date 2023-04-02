import * as API from './api';
import { Button } from './button';
import * as StorageService from './storage-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { updateDB } from './firebase';
import { refs } from './open-registration';

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
export const isModalOpen = {
  isOpen: false,
};

function onCardClick(e) {
  const targetCard = e.target;
  const card = targetCard.closest('.moviesgallery-item');
  const cardId = card.dataset.id;
  // console.log(cardId);

  API.searchMovieId(cardId)
    .then(response => {
      if (response.status === 'Released') {
        return response;
      }
    })
    .then(response => {
      modalBackdrop.classList.remove('is-hidden');
      const markup = createModalMarkup(response);
      modal.innerHTML = markup;
      currentFilm = response;
      // console.log(res);

      new Button('[data-list="watched"]', btnHandler);
      new Button('[data-list="queue"]', btnHandler);
    })
    .catch(error => {
      Notify.failure('Oooopsss, something went WRONG!!!');
      console.log('error is', error);
    });
}

function btnHandler(e) {
  const button = e.target;
  const film = currentFilm;
  const storageKey =
    button.dataset.list === 'watched'
      ? StorageService.KEYS.WATCHED
      : StorageService.KEYS.QUEUE;
  const currentAction = button.dataset.action;
  const userUid = JSON.parse(localStorage.getItem('user'));

  switch (currentAction) {
    case 'remove': {
      StorageService.removeFilmFromLs(storageKey, film);
      button.dataset.action = 'add';
      button.textContent = 'Add to watched';
      button.blur();
      if (userUid) {
        updateDB(userUid.uid);
      } else {
        isModalOpen.isOpen = true;
        refs.backdrop.classList.remove('is-hidden');
      }
      break;
    }
    case 'add': {
      StorageService.addFilmToLs(storageKey, film);
      button.dataset.action = 'remove';
      button.textContent = 'Remove from watched';
      button.blur();
      if (userUid) {
        updateDB(userUid.uid);
      } else {
        isModalOpen.isOpen = true;
        refs.backdrop.classList.remove('is-hidden');
      }
      break;
    }

    default:
      return;
  }
}
