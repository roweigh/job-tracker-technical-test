import axios from 'axios'
const BACKEND_URL = 'http://localhost:5166/api'

const config = {
  headers: { 'Content-Type': 'application/json' },
}

export async function get (url) {
  return await axios.get(BACKEND_URL + url, config)
}

export async function post (url, data) {
  return await axios.post(BACKEND_URL + url, data, config)
}

export async function put (url, data) {
  return await axios.put(BACKEND_URL + url, data, config)
}

export async function bulkImport () {
  const movieData = [...data].map(movie => {
    return {
      movieId: movie.url.match('\/title\/(.*)\/')[1],
      name: `${movie.name}`,
      description: movie.description,
      rating: movie.aggregateRating.ratingValue.toFixed(1),
      year: movie.datePublished.split('-')[0],
      duration: movie.duration.replace('PT', ''),
    };
  });

  const promises = [];
  movieData.forEach(movie => {
    promises.push(addDoc(collection(db, 'movies'), movie));
  });

  await Promise.all(promises);
}