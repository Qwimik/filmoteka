// modal-details.js
const modalBackdrop = document.querySelector('.modal__backdrop');
const modal = document.querySelector('.modal');
const movieItem = document.querySelector('.moviesgallery-item');

movieItem.addEventListener('click', openModal);

function openModal() {
    modalBackdrop.classList.remove('.is-hidden');
    document.body.classList.remove('.is-hidden')
    setCloseOptionModal();
}

function setCloseOptionModal() {
  modalBackdrop.addEventListener('click', closeModalForClickBeackdrop);
  document.addEventListener('keydown', closeModalForEscape);
  document.querySelector('button__close').addEventListener('click', closeModal);
}

function closeModalForEscape(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
}

function closeModalForClickBeackdrop(e) {
  if (e.target === modalBackdrop) {
    closeModal();
  }
}

function closeModal() {
    modalBackdrop.classList.add('.is-hidden');
    document.body.classList.add('.is-hidden');
    modalBackdrop.removeEventListener('click', closeModalForClickBeackdrop);
    document.removeEventListener('keydown',closeModalForEscape);
}

