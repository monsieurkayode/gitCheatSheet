import axios from 'axios';
import decode from 'jwt-decode';
import * as types from './actionTypes';
import { toastError, toastSuccess, toastInfo } from '../helpers/toster';

const makingApiRequest = pending => ({
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

  try {
    const response = await axios.post('/api/v1/login', userCredentials);
    const { token, message } = response.data;
    localStorage.setItem('jwtToken', token);
    const { user } = decode(token);
    dispatch(loginUserSuccess(user));
    dispatch(makingApiRequest(false));
    toastSuccess(message);
  } catch (error) {
    const { data } = error.response;
    dispatch(loginUserFailure(data));
    dispatch(makingApiRequest(false));
    toastError(data.message);
  }
};

const registerUserFailure = error => ({
  type: types.LOGIN_USER_FAILURE,
  error
});

const registerUserSuccess = user => ({
  type: types.LOGIN_USER_SUCCESS,
  user
});

export const registerUser = userDetails => async (dispatch) => {
  dispatch(makingApiRequest(true));

  try {
    const response = await axios.post('/api/v1/register', userDetails);
    const { token, message } = response.data;
    localStorage.setItem('jwtToken', token);
    const { user } = decode(token);
    dispatch(registerUserSuccess(user));
    dispatch(makingApiRequest(false));
    toastSuccess(message);
  } catch (error) {
    const { data } = error.response;
    dispatch(registerUserFailure(data));
    dispatch(makingApiRequest(false));
    toastError(data.message);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  toastInfo('User account logged out');
  return dispatch({ type: types.LOGOUT_USER });
};
