import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as movieApi from '../services/movieApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './pages.module.css';

export default function MoviesPage() {
  const [serchMovies, setSearchMovies] = useState([]);
  const [movies, setMovies] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  const onFormSubmit = movies => {
    setMovies(movies);
  };

  const onSearchChanges = e => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  };

  const onSubmit = e => {
    e.preventDefault();

    if (searchValue === "") {
      return toast.warning("Please, enter a request");
    }

    onFormSubmit(searchValue);
    setSearchValue("");
  };

  useEffect(() => {
    if (movies === "") {
      return toast.error("Please, enter a request");
    }

    movieApi.fetchMovieByKeyWord(movies).then(data => {
      setSearchMovies(serchMovies => [...serchMovies, ...data.results]);
    });
  }, [movies]);

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
            onChange={onSearchChanges}
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