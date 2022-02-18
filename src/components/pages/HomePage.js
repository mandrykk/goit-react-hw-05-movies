import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as movieApi from '../services/movieApi';
import s from './pages.module.css';

export default function HomePage() {
    const [trends, setTrends] = useState([]);
    const location = useLocation();

    useEffect(() => {
        movieApi.fetchTrendingMovies().then(data => {
            setTrends(trends => [...trends, ...data.results])
        });
    }, []);

    return (
        <>
            <h2 className={s.homeTitle}>Trending today</h2>
            <ul className={s.homePageList}>
                {trends && trends.map(trend => (
                    <li key={trend.id} className={s.listItem}>
                        <Link
                            className={s.link}
                            state={{from:location}}
                            to={`/movies/${trend.id}`}>
                            {trend.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}