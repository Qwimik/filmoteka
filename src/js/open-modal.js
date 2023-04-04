import * as API from './api';
import { Button } from './button';
import * as StorageService from './storage-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';
import { updateDB } from './firebase';
import { refs } from './open-registration';
import BigPicture from 'bigpicture';
import { hideScroll } from './scroll';

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
  const targetCard = e.target.closest('li');

  if (!targetCard) return;

  const card = targetCard.closest('.moviesgallery-item');
  const cardId = card.dataset.id;

  API.searchMovieId(cardId)
    .then(response => {
      if (response.status === 'Released') {
        return response;
      }
    })
    .then(response => {
      modalBackdrop.classList.remove('is-hidden');
      const markup = createModalMarkup(response);
      hideScroll();

      modal.innerHTML = markup;
      currentFilm = response;

      new Button('[data-list="watched"]', btnHandler);
      new Button('[data-list="queue"]', btnHandler);
      new Button('.film__button-trailer', watchTrailer);
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

async function watchTrailer(e) {
  const { id } = e.currentTarget;
  const videos = await API.getVideos(id);
  const trailerData =
    videos.find(({ name }) => name === 'Official Trailer') ||
    videos.find(({ type }) => type === 'Trailer');
  if (!trailerData) {
    Notiflix.Notify.failure('Incorrect data. Please, try again.', {
      position: 'center-top',
    });
    return;
  }
  BigPicture({
    el: e.target,
    ytSrc: trailerData.key,
  });
}
