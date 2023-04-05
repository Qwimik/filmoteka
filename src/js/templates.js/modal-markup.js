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
          <div class="film__image" width="375">
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
              <div class="trailer-container">
                <button type="button" id=${id} class="film__button-trailer button-trailer" title="Watch Trailer" data-btn="watchTrailer">
                  <svg height="40px" width="40px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 461.001 461.001" xml:space="preserve">
                    <g>
                      <path style="fill:#F61C0D;" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728
                        c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137
                        C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607
                        c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"/>
                    </g>
                  </svg>
                  <span>Watch trailer</span>
                </button>
              </div>
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
                    aria-label="use storage"
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
                    aria-label="use storage"
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
