import * as IMG from '../images/zhdun-img.png';

export function toCheckLibrary(data) {
  if (!data.innerHTML) {
    data.innerHTML = `<img src=${IMG} alt="waiting"> <p> NO ITEMS TO SHOW AT THIS MOMENT!!!</p>`;
    data.classList.add(`empty-library`);
  } else {
    data.classList.remove(`empty-library`);
  }
}
