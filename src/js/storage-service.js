export const KEYS = {
  WATCHED: 'watchedFilms',
  QUEUE: 'queueFilms',
};

export function addFilmToLs(key, film) {
  const data = localStorage.getItem(key);
  const currentFilms = [];

  if (data) {
    currentFilms.push(...JSON.parse(data));
  }

  const isInclude = currentFilms.some(({ id }) => id === film.id);

  if (isInclude) return;

  currentFilms.push(film);
  localStorage.setItem(key, JSON.stringify(currentFilms));
}

export function removeFilmFromLs(key, { id }) {
  const data = localStorage.getItem(key);

  if (!data) return;

  const currentFilms = JSON.parse(data);

  const newFilms = currentFilms.filter(item => item.id !== id);

  localStorage.setItem(key, JSON.stringify(newFilms));
}

export function getFilms(key) {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
}

export function isInclude(key, film) {
  const allFilms = getFilms(key);
  if (!allFilms) {
    return false;
  }
  return allFilms.some(({ id }) => id === film.id);
}
