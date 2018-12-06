import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return { ...state, user: action.user };
    case types.REGISTER_USER_SUCCESS:
      return { ...state, user: action.user };
    case types.MAKING_API_REQUEST:
      return { ...state, makingApiRequest: action.pending };
    case types.LOGOUT_USER:
      return { ...state, user: {} };
    default:
      return state;
  }
};
