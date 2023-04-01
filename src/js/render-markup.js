const POSTER_BASE_URL = `https://image.tmdb.org/t/p/w500`;
const cardList = document.querySelector(`.moviesgallery-box`);
import { genres } from '../data/genres.js';

export function renderCardMarkup(data) {
  const resultArray = data.results;

  const singleCard = resultArray
    .map(
      ({
        poster_path,
        title,
        genre_ids,
        release_date,
        vote_average,
        original_name,
        first_air_date,
        id,
      }) => {
        let rating = vote_average.toFixed(1);

        let itemGenre = [];
        let finalCardGenre = [];
        genre_ids.forEach(function (item) {
          let genre = genres.map(genre => {
            if (item === genre.id) {
              itemGenre.push(genre.name);
            }
          });
          finalCardGenre = itemGenre.join(`, `);
        });

        let cardTitle = ``;
        if (title) {
          cardTitle = title;
        } else if (original_name) {
          cardTitle = original_name;
        }

        let cardDate = ``;
        if (release_date) {
          cardDate = release_date;
        } else if (first_air_date) {
          cardDate = first_air_date;
        }
        let cardYear = cardDate.substring(0, 4);
        return `<li class="moviesgallery-item" data-id="${id}">
            <div class="moviesgallery-wrap">
            <div class="thumb">
              <img class="moviesgallery-img" src="${POSTER_BASE_URL}${poster_path}" alt="${title}" width="440" />
            </div>
              <div class="moviesgallery-text">
                <p class="moviesgallery-text-title">${cardTitle}</p>
                <div class="ganres-wrap">
                <p class="text">${finalCardGenre}  | ${cardYear}</p>
                <div class="rating">${rating}</div>
              </div>
            </div>
            </div>
            </li>`;
      }
    )
    .join(``);
  cardList.innerHTML = singleCard;
  return singleCard;
}
