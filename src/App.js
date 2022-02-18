import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';

const HomePage = lazy(() => import('./components/pages/HomePage' /* webpackChunkName: "home-page" */));
const MoviesPage = lazy(() => import('./components/pages/MoviesPage' /* webpackChunkName: "movie-page" */));
const MovieDetailsPage = lazy(() => import('./components/pages/MovieDetailsPage' /* webpackChunkName: "movie-details" */));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage' /* webpackChunkName: "not-found-page" */));

export default function App() {
  return (
    <div className="App">
      <Navigation />
      
      <Suspense fallback={<h1>Loading</h1>}>
       <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

    </div>
  );
}