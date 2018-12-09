import axios from 'axios';
import Progress from '../helpers/progress';
import * as types from './actionTypes';
import { makingApiRequest } from './userActions';

const fetchCheatsFailure = error => ({
  type: types.FETCH_CHEATS_FAILURE,
  error
});

const fetchCheatsSuccess = cheats => ({
  type: types.FETCH_CHEATS_SUCCESS,
  cheats
});

const fetchCategoriesSuccess = categories => ({
  type: types.FETCH_CATEGORIES_SUCCESS,
  categories
});

const fetchCategoriesFailure = error => ({
  type: types.FETCH_CATEGORIES_FAILURE,
  error
});

const fetchCheats = (category = '') => async (dispatch) => {
  dispatch(makingApiRequest(true));
  Progress.start();

  try {
    const response = await axios.get(`/api/v1/cheats/${category}`);
    const res = await axios.get('/api/v1/categories');
    const { cheatSheets } = response.data;
    const { categories } = res.data;
    dispatch(fetchCheatsSuccess(cheatSheets));
    dispatch(fetchCategoriesSuccess(categories));
    dispatch(makingApiRequest(false));
    Progress.done();
  } catch (error) {
    const { data } = error.response;
    dispatch(fetchCheatsFailure(data));
    dispatch(fetchCategoriesFailure(data));
    dispatch(makingApiRequest(false));
    Progress.done();
  }
};

export default fetchCheats;
