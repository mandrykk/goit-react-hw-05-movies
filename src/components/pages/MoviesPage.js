import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as movieApi from '../services/movieApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './pages.module.css';

export default function MoviesPage() {
  const [serchMovies, setSearchMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigation = useNavigate();
  const queryName = new URLSearchParams(location.search).get('query') ?? '';

  const onFormSubmit = queryName => {
    navigation({ ...location, search: `query=${queryName}` });
  };

  const onSearchChange = event => {
    setSearchValue(event.currentTarget.value.toLowerCase());
  };

  const onSubmit = event => {
    event.preventDefault();

    setSearchValue(searchValue.trim());

    if (searchValue === '') {
      return toast.error("Please, enter a request");
    }

    onFormSubmit(searchValue);
    setSearchValue('');
  };

  useEffect(() => {
    if (queryName === '') {
      return toast.error("Please, enter a request");
    }

    movieApi.fetchMovieByKeyWord(queryName).then(data => {
      setSearchMovies(data.results);
    });
  }, [queryName]);

  return (
    <>
       <form className={s.form} onSubmit={onSubmit}>
          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movie"
            value={searchValue}
            onChange={onSearchChange}
          />
          <button type="submit" className={s.button}>
            Search
          </button>
        </form>


      <ul className={s.moviePageList }>
        {serchMovies &&
          serchMovies.map(movie => (
            <li key={movie.id} className={s.movielistItem }>
              <Link
                className={s.movieLink}
                to={`/movies/${movie.id}`}
                state={{ from: location }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}