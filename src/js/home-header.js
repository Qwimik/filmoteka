// home-header.js
import { searchMovieTitle } from './api';
import { renderCardMarkup } from './render-markup';

const formEl = document.querySelector('.header__form');
const errorText = document.querySelector('.header__form-text');

formEl.addEventListener('submit', onSubmitForm);

async function onSubmitForm(e) {
  e.preventDefault();
  const text = e.target.elements['movie-search'].value;
  if (!text) {
    return errorText.classList.remove('visually-hidden');
  }
  errorText.classList.add('visually-hidden');
  try {
    const response = await searchMovieTitle(text, 1);
    if (response.results.length === 0) {
      return errorText.classList.remove('visually-hidden');
    }
    renderCardMarkup(response);
  } catch (error) {
    console.log(error);
  }
}