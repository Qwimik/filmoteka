import * as allGenres from '../data/genres.js';
import { pagination } from './pagination';

const POSTER_BASE_URL = `https://image.tmdb.org/t/p/w500`;
const cardList = document.querySelector(`.moviesgallery-box`);
import * as plugPoster from '../images/placeholder.webp';
// console.log(plugPoster);
// const plugPoster = `./../images/placeholder.webp`;

export function renderCardMarkup(data) {
  const resultArray = data.results;

  if (
    window.location.pathname === '/library.html' ||
    window.location.pathname === '/filmoteka/library.html'
  ) {
    document.querySelector('#paginationWrapper').style.display = 'none';
  }
  if (resultArray) {
    const singleCard = resultArray
      .map(
        ({
          poster_path,
          title,
          genre_ids,
          genres,
          release_date,
          vote_average,
          original_name,
          first_air_date,
          id,
        }) => {
          let rating = vote_average.toFixed(1);

          let itemGenre = [];
          let finalCardGenre = [];

          const genresList = genre_ids ? genre_ids : genres;

          genresList.forEach(function (item) {
            let genre = allGenres.genres.map(genre => {
              if (item === genre.id) {
                itemGenre.push(genre.name);
              }
            });

            // finalCardGenre = itemGenre.join(`, `);
            if (!itemGenre.length) {
              finalCardGenre = 'Unknown genre';
            } else if (itemGenre.length > 2) {
              finalCardGenre = `${itemGenre[0]}, ${itemGenre[1]}, Other`;
            } else {
              finalCardGenre = itemGenre.join(`, `);
            }
            //         }
          });
          // function finalCardGenre(array) {
          //
          // const genres = finalCardGenre(genre_ids);
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

          let poster = poster_path
            ? `${POSTER_BASE_URL}${poster_path}`
            : plugPoster;

          return `<li class="moviesgallery-item" data-id="${id}">
            <div class="moviesgallery-wrap">
            <div class="thumb">
              <img class="moviesgallery-img" src="${poster}" alt="${title}" width="440" />
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

    if (cardList) {
      cardList.innerHTML = singleCard;
    }
  }
  // return singleCard;
}
