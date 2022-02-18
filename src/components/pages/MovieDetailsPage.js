import { useEffect, useState, Suspense } from 'react';
import { Link, useParams, useLocation, Routes, Route} from 'react-router-dom';
import * as movieApi from '../services/movieApi';
import s from './pages.module.css';
import Cast from "../Cast/Cast";
import Reviews from "../Reviews/Reviews";

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();

    useEffect(() => {
        movieApi.fetchMovieDetails(movieId).then(setMovie);
    }, [movieId])

    return (
        <>
            <Link to={location?.state.from ?? '/'} className={s.infoli}>Go back</Link>
            
            {movie && <>
                <h2 className={s.movieTitle}>{movie.title}</h2>
                <div className={s.movieWrap}>
                 <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={ movie.original_title} className={s.movieWrapImg}/>
                 <div>
                  <p className={s.score}>User Score: {movie.vote_average}</p>
                  <h3>Overview</h3>
                  <p>{movie.overview}</p>
                  <h3>Genres</h3>
                  {movie.genres && (
                    <ul className={s.movieList}>
                        {movie.genres.map(genre => (
                            <li key={genre.id} className={s.movieItem}>{genre.name}</li>
                        ))}
                    </ul>
                    )}
                    </div>
                </div>
            </>}
            <hr />
            <p className={s.movietext}>Additional information:</p>
            <ul className={s.infolist}>
              <li className={s.infoitem}>
                <Link to={`/movies/${movieId}/cast`} state={{ from: location.state?.from }} className={s.infolink}>
                  Cast
                </Link>
              </li>
              <li>
                <Link to={`/movies/${movieId}/Reviews`} state={{ from: location.state?.from }} className={s.infolink}>
                  Reviews
                </Link>
              </li>
            </ul>
        
           <Suspense fallback={<h1>Loading</h1>}>
            <Routes>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Routes>
          </Suspense>
        </>
    )
}