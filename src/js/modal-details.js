// modal-details.js

const modalBackdrop = document.querySelector('.modal__backdrop');
const modal = document.querySelector('.modal');
const movieItem = document.querySelector('.moviesgallery-item');
const closeButton = document.querySelector(".button__close");

const closeModal = () => {
  modalBackdrop.classList.add("is-hidden");
};

closeButton.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});



