import * as API from './api';

import {
  createModalMarkup,
  addTrailersMarkup,
} from './templates.js/modal-markup';

const modalBackdrop = document.querySelector('.modal__backdrop');
const modal = document.querySelector('.modal__wrapper');
const field = document.querySelector('.moviesgallery');
field.addEventListener('click', onCardClick);
let markup = ``;

function onCardClick(e) {
  const targetCard = e.target;
  const card = targetCard.closest('.moviesgallery-item');
  const cardId = card.dataset.id;

  // console.log(cardId);

  try {
    API.searchMovieId(cardId)
      .then(res => {
        modalBackdrop.classList.remove('is-hidden');
        return createModalMarkup(res);
      })
      .then(res => {
        modal.innerHTML = res;
      });
  } catch (error) {
    console.log(error);
  }
}
