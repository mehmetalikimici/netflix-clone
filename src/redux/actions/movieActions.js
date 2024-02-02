import { options } from '../../constant';
import { ActionTypes } from '../actionTypes';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const getPopular = () => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_MOVIES_LOADING,
  });

  axios
    .get('/movie/popular?language=tr', options)
    .then((res) =>
      dispatch({
        type: ActionTypes.SET_MOVIES,
        payload: res.data.results,
      })
    )
    .catch((err) => {
      dispatch({
        type: ActionTypes.SET_MOVIES_ERROR,
        payload: err.message,
      });
    });
};

export const getGenres = () => (dispatch) => {
  dispatch({
    type: ActionTypes.SET_GENRES_LOADING,
  });

  axios
    .get('/genre/movie/list?language=tr', options)
    .then((res) => {
      dispatch({ type: ActionTypes.SET_GENRES, payload: res.data.genres });
    })
    .catch((err) =>
      dispatch({
        type: ActionTypes.SET_GENRES_ERROR,
        payload: err.message,
      })
    );
};
