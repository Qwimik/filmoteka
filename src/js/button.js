export class Button {
  constructor(id, handlerFunction) {
    this.button = document.querySelector(id);
    this.markupStorage = null;

    this.button.addEventListener('click', handlerFunction);
  }

  // Показує спіннер
  showSpinner() {
    // Дістаємо всю розмітку яка знаходиться всередині тега button та зберігаємо її в змінну markupStorage
    this.markupStorage = this.button.innerHTML;
    // Замінюємо стару розмітку на розмітку спіннера
    this.button.innerHTML = `
      <div class="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }

  // Ховає спіннер
  hideSpinner() {
    // Дістаємо розмітку яка була до вмикання спінера з markupStorage та ставимо її замість розмітки спінера
    this.button.innerHTML = this.markupStorage;
    // Чистимо markupStorage
    this.markupStorage = null;
  }
}
