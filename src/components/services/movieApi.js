const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_KEY = '1704eeba12da9b3ee467542f32393191';

async function fetchWithErrorHandling(url = '', config = {}) {
    const response = await fetch(url, config);
    return response.ok
        ? await response.json()
        : Promise.reject(new Error('Not found'));
}

export function fetchTrendingMovies() {
    return fetchWithErrorHandling(`${BASE_URL}/trending/movie/day?api_key=${BASE_KEY}`)
};
//  список популярных фильмов для создания коллекции на главной странице

export function fetchMovieByKeyWord(movie) {
    return fetchWithErrorHandling(`${BASE_URL}/search/movie?api_key=${BASE_KEY}&query=${movie}`)
}
// поиск кинофильма по ключевому слову на странице фильмов

export function fetchMovieDetails(movieId) {
    return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}?api_key=${BASE_KEY}`)
}
// запрос полной информации о фильме для страницы кинофильма

export function fetchMovieCredits (movieId) {
    return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/credits?api_key=${BASE_KEY}`)
}
// запрос информации о актёрском составе для страницы кинофильма

export function fetchMovieReviews(movieId) {
    return fetchWithErrorHandling(`${BASE_URL}/movie/${movieId}/reviews?api_key=${BASE_KEY}`)
}
// запрос обзоров для страницы кинофильма