import axios from 'axios';
import decode from 'jwt-decode';
import * as types from './actionTypes';
import { toastError, toastSuccess, toastInfo } from '../helpers/toster';
import Progress from '../helpers/progress';

export const makingApiRequest = pending => ({
  type: types.MAKING_API_REQUEST,
  pending
});

const loginUserFailure = error => ({
  type: types.LOGIN_USER_FAILURE,
  error
});

export const loginUserSuccess = user => ({
  type: types.LOGIN_USER_SUCCESS,
  user
});

export const loginUser = userCredentials => async (dispatch) => {
  dispatch(makingApiRequest(true));
  Progress.start();

  try {
    const response = await axios.post('/api/v1/login', userCredentials);
    const { token, message } = response.data;
    localStorage.setItem('jwtToken', token);
    const { user } = decode(token);
    dispatch(loginUserSuccess(user));
    dispatch(makingApiRequest(false));
    toastSuccess(message);
    Progress.done();
  } catch (error) {
    const { data } = error.response;
    dispatch(loginUserFailure(data));
    dispatch(makingApiRequest(false));
    toastError(data.message);
    Progress.done();
  }
};

const registerUserFailure = error => ({
  type: types.REGISTER_USER_FAILURE,
  error
});

const registerUserSuccess = user => ({
  type: types.REGISTER_USER_SUCCESS,
  user
});

export const registerUser = userDetails => async (dispatch) => {
  dispatch(makingApiRequest(true));
  Progress.start();

  try {
    const response = await axios.post('/api/v1/register', userDetails);
    const { token, message } = response.data;
    localStorage.setItem('jwtToken', token);
    const { user } = decode(token);
    dispatch(registerUserSuccess(user));
    dispatch(makingApiRequest(false));
    toastSuccess(message);
    Progress.done();
  } catch (error) {
    const { data } = error.response;
    dispatch(registerUserFailure(data));
    dispatch(makingApiRequest(false));
    toastError(data.message);
    Progress.done();
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  toastInfo('User account logged out');
  return dispatch({ type: types.LOGOUT_USER });
};
