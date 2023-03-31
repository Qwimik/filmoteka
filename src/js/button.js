export class Button {
  constructor(id, handler) {
    this.button = document.querySelector(id);

    document.addEventListener('click', handler);
  }

  makeNewBtn(isActive) {
    return `
            <button class="button ${isActive ? 'active' : ''}"></button>
        `;
  }
}
