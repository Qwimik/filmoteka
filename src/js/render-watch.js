const POSTER_BASE_URL = `https://image.tmdb.org/t/p/w500`;
import { KEYS, getFilms } from './storage-service';
import { genres } from '../data/genres.js';
const queue = document.querySelector('[data-active="queue"]');
const cardList = document.querySelector('[data-set="library-films"]');
const plugPoster = 'placeholder.237126ea.webp';
const changedKey = genres;
const watchArray = getFilms(KEYS.WATCHED);
const queueArray = getFilms(KEYS.QUEUE);

const remove = document.querySelector('[data-list="watched"]');

export function renderCardMarkup(data) {
  document.querySelector('#paginationWrapper').style.display = 'none';

  if (data) {
    document.querySelector('#paginationWrapper').style.display = 'block';
    console.log(data);
    const singleCard = data
      .map(
        ({
          poster_path,
          title,
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
          genres.forEach(function (item) {
            let genre = changedKey.map(genre => {
              if (item.id === genre.id) {
                itemGenre.push(genre.name);
              }
            });

            if (!itemGenre.length) {
              finalCardGenre = 'Unknown genre';
            } else if (itemGenre.length > 2) {
              finalCardGenre = `${itemGenre[0]}, ${itemGenre[1]}, Other`;
            } else {
              finalCardGenre = itemGenre.join(`, `);
            }
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

if (window.location.pathname === '/library.html') {
  renderCardMarkup(watchArray);
}

if (queue !== null) {
  queue.addEventListener('click', () => {
    cardList.innerHTML = '';
    renderCardMarkup(queueArray);
  });
}
