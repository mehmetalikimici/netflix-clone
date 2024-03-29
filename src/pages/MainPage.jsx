import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, getPopular } from '../redux/actions/movieActions';
import Hero from '../components/Hero';
import MovieList from '../components/MovieList';

const MainPage = () => {
  const state = useSelector((store) => store.genre);
  console.log(state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPopular());
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <Hero />
      {state.isLoading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : state.isError ? (
        <p>Üzgünüz bir hata oluştu. {state.isError}</p>
      ) : (
        state.genres.map((genre) => <MovieList key={genre.id} genre={genre} />)
      )}
    </div>
  );
};

export default MainPage;
