import { async } from '@firebase/util';
import { searchMovieGenre } from './api';
import { genres } from '/src/data/genres';
import { renderCardMarkup } from './render-markup';
const navigation = document.querySelector('.navigation__genre');
let idGenre = 0;

if (navigation) {
  navigation.addEventListener('click', onClickFilterByGenre);
}

async function onClickFilterByGenre(e) {
  const textContent = e.target.textContent;
  genres.forEach(element => {
    if (textContent === element.name) {
      idGenre = element.id;
    }
  });
  const response = await searchMovieGenre(idGenre);
  renderCardMarkup(response);
}
