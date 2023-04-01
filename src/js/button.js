export class Button {
  constructor(id, handlerFunction) {
    this.button = document.querySelector(id);

    this.button.addEventListener('click', handlerFunction);
  }
}
