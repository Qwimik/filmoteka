import * as API from './api';
const modalBackdrop = document.querySelector('.modal__backdrop');
const modal = document.querySelector('.modal');
const field = document.querySelector('.moviesgallery');
field.addEventListener('click', onCardClick);

function onCardClick(e) {
  const targetCard = e.target;
  const card = targetCard.closest('.moviesgallery-item');
  const cardId = card.dataset.id;

  console.log(cardId);

  try {
    API.searchMovieId(cardId).then(res => {
      modalBackdrop.classList.remove('is-hidden');

      console.log(res);
      //   console.log(renderCardMarkup(res));
    });
  } catch (error) {
    console.log(error);
  }
}
