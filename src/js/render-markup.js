const POSTER_BASE_URL = `https://image.tmdb.org/t/p/w500`;

const cardList = document.querySelector(`.moviesgallery-box`);

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

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
        cardYear = cardDate.substring(0, 4);

        let cardGenre = genre_ids.map(id => id);

        return `<li class="moviesgallery-item" data-id="${id}">
            <div class="moviesgallery-wrap">
              <img src="${POSTER_BASE_URL}${poster_path}" alt="${title}" width="440" />
              <div class="moviesgallery-text">
                <p class="moviesgallery-text-title">${cardTitle}</p>
                <div class="ganres-wrap">
                <p class="text">${finalCardGenre}  | ${cardYear}</p>
                <div class="rating">${rating}</div>
                </div>
              </div>
            </div>`;
      }
    )
    .join(``);
  cardList.innerHTML = singleCard;
  return singleCard;
}
