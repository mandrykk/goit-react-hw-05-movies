import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as movieApi from '../services/movieApi';
import s from './Cast.module.css';
import defaultImage from './default.png';

export default function Cast() {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);
    
    useEffect(() => {
        movieApi.fetchMovieCredits(movieId).then(({ cast }) =>
        setCast(cast));
    }, [movieId]);

    return (
        <>
            <ul className={s.castList}>
                {cast && cast.map(cas => (
                <li key={cas.name}>
                     <img src={cas.profile_path ? `https://www.themoviedb.org/t/p/w185${cas.profile_path}` : defaultImage}
                     alt={cas.name}
                     width="100px"
                     />
                     <h3 className={s.castTitle}>{cas.name}</h3>
                     <p>Character: {cas.character}</p>
                </li>))}
            </ul>
        </>
  );
}