export const refs = {
  backdrop: document.querySelector('[data-set="personal-cabinet"]'),
  open: document.querySelector('#btnLibrary'),
  close: document.querySelector('[data-set="close-cabinet"]'),
};
export const refsRegistration = {
  backdrop: document.querySelector('[data-set="registration"]'),
  open: document.querySelector('[data-set="registration-open"]'),
  close: document.querySelector('[data-set="close-registration"]'),
};
const comeBack = document.querySelector('.come-back');
export class OpenCloseModal {
  constructor({ backdrop, open, close }) {
    this.backdrop = backdrop;
    this.open = open;
    this.close = close;
  }
  openModal() {
    this.open.addEventListener('click', () =>
      this.backdrop.classList.remove('is-hidden')
    );
  }
  closeModal() {
    this.close.addEventListener('click', () =>
      this.backdrop.classList.add('is-hidden')
    );
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.backdrop.classList.add('is-hidden');
      }
    });
    this.backdrop.addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        this.backdrop.classList.add('is-hidden');
      }
    });
  }
}
const closeRegistration = new OpenCloseModal(refsRegistration);
const modal = new OpenCloseModal(refs);
// modal.openModal();
if (refs.close) {
  modal.closeModal();
}
if (refsRegistration.open) {
  refsRegistration.open.addEventListener('click', e => {
    refs.backdrop.classList.add('is-hidden');
    refsRegistration.backdrop.classList.remove('is-hidden');
    closeRegistration.closeModal();
  });
}

if (comeBack) {
  comeBack.addEventListener('click', () => {
    refsRegistration.backdrop.classList.add('is-hidden');
    refs.backdrop.classList.remove('is-hidden');
  });
}
