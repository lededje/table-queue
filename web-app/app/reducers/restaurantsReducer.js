import { FETCH_RESTAURANT_SUCCESS } from '../actions/types';

const initialState = {
  restaurants: {},
};

const restaurantsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case FETCH_RESTAURANT_SUCCESS:
      return {
        ...state,
        restaurants: {
          ...state.restaurant,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default restaurantsReducer;
