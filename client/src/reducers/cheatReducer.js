import * as types from '../actions/actionTypes';
import { initialCheats as initialState } from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_CHEATS_SUCCESS:
      return { ...state, cheats: action.cheats };
    case types.MAKING_API_REQUEST:
      return { ...state, makingApiRequest: action.pending };
    case types.FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.categories };
    case types.SET_COPIED_CLIPBOARD_ID:
      return { ...state, copiedId: action.id };
    case types.SET_SEARCH_TERM:
      return { ...state, searchTerm: action.searchTerm };
    default:
      return state;
  }
};
