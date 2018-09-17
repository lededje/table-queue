import type { Reducer } from 'redux';
import type { Restaurant } from '../types/Restaurant';

type FetchRestaurantSuccessAction = {
  +type: 'FETCH_RESTAURANT_SUCCESS',
  +payload: Restaurant,
};

type Action = FetchRestaurantSuccessAction;

type State = {
  +restaurants: {
    +[$PropertyType<Restaurant, 'id'>]: Restaurant,
  },
};

const initialState: State = {
  restaurants: {},
};

const restaurantsReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'FETCH_RESTAURANT_SUCCESS':
      return {
        ...state,
        restaurants: {
          ...state.restaurants,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};

export default restaurantsReducer;
