import { combineReducers } from 'redux';

import request from './requestReducer';
import restaurants from './restaurantsReducer';

export default combineReducers({
  request,
  restaurants,
});
