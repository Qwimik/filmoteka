import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '3217ae06898d6f0a1d4d89e84bb85582';

axios.defaults.baseURL = BASE_URL;

export const searchTrending = async page => {
  const res = await axios.get(`/movie/popular?api_key=${API_KEY}&page=${page}`);
  return res.data;
};

export const searchMovieId = async id => {
  const res = await axios.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
  return res.data;
};

export const searchMovieTitle = async (title, page) => {
  const res = await axios.get(
    `/search/movie?api_key=${API_KEY}&page=${page}&language=en-US&include_adult=false&query=${title}`
  );
  return res.data;
};
export const searchMovieGenre = async (genre, page) => {
  const res = await axios.get(
    `discover/movie?api_key=${API_KEY}&with_genres=${genre}&page=${page}&language=en-US&include_adult=false&sort_by=revenue.desc`
  );
  return res.data;
};

//функція яка отримує список відео для фільму з API
export const getVideos = async movie_id => {
  const url = `${BASE_URL}/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
