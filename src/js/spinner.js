export function addSpinnerTo(id, extraClass) {
  const parent = document.querySelector(id);
  console.log(parent);
  const spinnerMarkup = `
     <div class="spinner ${extraClass}">
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
  parent.insertAdjacentHTML('afterbegin', spinnerMarkup);
}

export function removeSpinnerFrom(id) {}
