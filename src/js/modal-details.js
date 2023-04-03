import { renderActiveListFilms } from './library-header';

// modal-details.js

const modalBackdrop = document.querySelector('.modal__backdrop');
const modal = document.querySelector('.modal');
const movieItem = document.querySelector('.moviesgallery-item');
const closeButton = document.querySelector('.button__close');

const closeModal = () => {
  modalBackdrop.classList.add('is-hidden');
  if (
    window.location.pathname === '/library.html' ||
    window.location.pathname === '/filmoteka/library.html'
  ) {
    renderActiveListFilms();
  }
};

closeButton.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});
