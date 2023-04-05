import { async } from '@firebase/util';
import { searchMovieGenre } from './api';
import { genres } from '/src/data/genres';
import { renderCardMarkup } from './render-markup';
import { pagination } from './pagination';
import { scrollToTop } from './scrollToTop';
const navigation = document.querySelector('.navigation__genre');
let idGenre = 0;

if (navigation) {
  navigation.addEventListener('click', onClickFilterByGenre);
}

async function onClickFilterByGenre(e) {
  const textContent = e.target.textContent;
  // console.log(genres);
  // idGenre = genres.name;
  genres.forEach(element => {
    if (textContent === element.name) {
      idGenre = element.id;
    }
  });

  const response = await searchMovieGenre(idGenre, 1);
  pagination.reset();
  pagination.off();
  pagination.on('beforeMove', async evt => {
    scrollToTop();
    // console.log(response);
    const currentPage = evt.page;
    console.log(currentPage);
    console.log(idGenre);
    const response = await searchMovieGenre(idGenre, currentPage);
    // pagination.movePageTo(1);
    renderCardMarkup(response);
  });
  renderCardMarkup(response);
}
