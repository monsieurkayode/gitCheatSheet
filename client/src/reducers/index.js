import { combineReducers } from 'redux';
import userReducer from './userReducer';
import cheatReducer from './cheatReducer';

const rootReducer = combineReducers({
  userDetails: userReducer,
  cheatSheets: cheatReducer
});

export default rootReducer;
