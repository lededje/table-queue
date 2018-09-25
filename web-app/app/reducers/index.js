import { combineReducers } from 'redux';

import request from './requestReducer';
import restaurants from './restaurantsReducer';
import reservations from './reservationsReducer';

export default combineReducers({
  request,
  restaurants,
  reservations,
});
