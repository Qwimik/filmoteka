import placeholder from '../../images/placeholder.webp';
import { KEYS, isInclude } from './../storage-service';

function createModalMarkup(movie) {
  const {
    poster_path,
    title,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    videos,
    overview,
    id,
  } = movie;

  // const trailerButton =
  //   videos.results.length !== 0
  //     ? `<li class="btn-list__item btn-list__item--film"><button type="button" class="button js-film__button--trailer film__button upper">
  //     Watch trailer
  //   </button></li>`
  //     : '';

  const genresList = genres.map(genre => genre.name).join(', ');
  const genre =
    genres.length !== 0
      ? `<tr>
        <td class="film__item">Genre</td>
        <td class="film__details">${genresList}</td>
      </tr>`
      : '';
  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : placeholder;

  const markup = `
        <div class="modal__wrapping">
          <div class="film__image">
          <img
          class="image"
          src="${poster}"
          loading="lazy"
          alt="${title} poster"
          />
          </div>
          <div class="film__info">
            <h2 class="film__title upper">${title}</h2>
            <table>
              <thead>
                <tr>
                  <td class="film__item">Vote / Votes</td>
                  <td class="film__details">
                    <span class="film__rating"
                      >${vote_average.toFixed(1)}
                    </span>
                    /
                    <span class="film__votes-number">${vote_count} </span>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="film__item">Popularity</td>
                  <td class="film__details">${popularity}</td>
                </tr>
                <tr>
                  <td class="film__item">Original Title</td>
                  <td class="film__details upper">${original_title}</td>
                </tr>
                ${genre}
              </tbody>
            </table>
            <div>
              <h3 class="film__about--title upper">About</h3>
              <p class="film__about--text">${overview}</p>
            </div>
            <div class="film__button--wrapper">
            <p class="nologin"></p>
              <ul class="btn-list js-btn-add-list">
                <li class="btn-list__item btn-list__item--film">
                  <button
                    type="button"
                    class="button film__button upper active"
                    id=${id}
                    data-list="watched"
                    data-action=${
                      isInclude(KEYS.WATCHED, movie) ? 'remove' : 'add'
                    }
                  >
                    ${
                      isInclude(KEYS.WATCHED, movie)
                        ? 'Remove from watched'
                        : 'Add to watched'
                    }
                  </button>
                </li>
                <li class="btn-list__item btn-list__item--film">
                  <button
                    type="button"
                    class="button film__button upper"
                    id=${id}
                    data-list="queue"
                    data-action=${
                      isInclude(KEYS.QUEUE, movie) ? 'remove' : 'add'
                    }
                  >
                    ${
                      isInclude(KEYS.QUEUE, movie)
                        ? 'Remove from queue'
                        : 'Add to queue'
                    }
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      `;
  return markup;
}

function addTrailersMarkup({ videos }) {
  const trailers = videos.results
    .slice(0, 1)
    .map(trailer => {
      return `<li class="film__trailer--item">
      <iframe 
      class="film__trailer"
      src="https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0&autoplay=1"
      title="YouTube video player"
       frameborder="0"
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
       allowfullscreen
       allow-popups-to-escape-sandbox
     ></iframe>
     </li>`;
    })
    .join('');
  return `<ul class="film__trailers">${trailers}</ul>`;
}

export { createModalMarkup, addTrailersMarkup };
