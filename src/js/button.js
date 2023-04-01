export class Button {
  constructor(id, handlerFunction) {
    this.button = document.querySelector(id);
    // console.log(this.button);

    this.button.addEventListener('click', handlerFunction);
  }
}
