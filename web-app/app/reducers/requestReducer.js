import type { Reducer } from 'redux';

type State = {
  state: {
    +selectedRestaurantId?: number,
  },
  host: string,
  cookie: string,
};

type Action = empty;

const initialState = {
  state: {
    selectedRestaurantId: undefined,
  },
  host: '',
  cookie: '',
};

const requestReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'SET_RESTAURANT_ID':
      return {
        ...state,
        state: {
          ...state.state,
          selectedRestaurantId: action.restaurantId,
        },
      };
    default:
      (action: empty); // eslint-disable-line no-unused-expressions
      return state;
  }
};

export default requestReducer;
