const openModalBtn = document.querySelector('.js-modal-open');
const closeModalBtn = document.querySelector('.js-modal-close');
const modalTeam = document.querySelector('.js-modal-team');

openModalBtn.addEventListener('click', openModalTeam);
function openModalTeam(evt) {
  evt.preventDefault();
  openModal();
  document.addEventListener('keydown', onEscKeyPress);
  closeModalBtn.addEventListener('click', closeModalTeam);
  modalTeam.addEventListener('click', onBackdropClick);
}
function openModal() {
  modalTeam.classList.toggle('is-hidden');
}
function closeModalTeam() {
  openModal();
  closeModalBtn.removeEventListener('click', closeModalTeam);
}
function onBackdropClick(evt) {
  if (evt.currentTarget === evt.target) {    
    openModal();
    document.removeEventListener('keydown', onEscKeyPress);
    modalTeam.removeEventListener('click', onBackdropClick);
  }
}
function onEscKeyPress(evt) {
  const ESK_KEY_CODE = 'Escape';
  const isEskKey = evt.code == ESK_KEY_CODE;
  if (isEskKey) {
    openModal();
    document.removeEventListener('keydown', onEscKeyPress);
    closeModalBtn.removeEventListener('click', closeModalTeam);
    modalTeam.removeEventListener('click', onBackdropClick);
  }
}