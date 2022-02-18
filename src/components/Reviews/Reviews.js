import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as movieApi from '../services/movieApi';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    movieApi.fetchMovieReviews(movieId).then(({ results }) =>
      setReviews(results));
  }, [movieId]);

  return (
    <>
      {reviews.length === 0 ? <p>We don't have any reviews for this movie.</p>
        : <ul>
           {reviews.map(review => (
            <li key={review.id} style={{listStyle: "none"}}>
               <p>Author: { review.author}</p>
               <p>{ review.content}</p>
           </li>
           ))}
         </ul>
      }
    </>
  );
}