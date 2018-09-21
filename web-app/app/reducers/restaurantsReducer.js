import type { Reducer } from 'redux';
import type { Restaurant } from '../types/Restaurant';

type FetchRestaurantSuccessAction = {
  +type: 'FETCH_RESTAURANT_SUCCESS',
  +payload: Restaurant,
};

type RestaurantsState = {
  +[$PropertyType<Restaurant, 'id'>]: Restaurant,
};

type Action = FetchRestaurantSuccessAction;

type State = {
  restaurants: RestaurantsState,
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
      (action: empty); // eslint-disable-line no-unused-expressions
      return state;
  }
};

export default restaurantsReducer;
export type { RestaurantsState };
