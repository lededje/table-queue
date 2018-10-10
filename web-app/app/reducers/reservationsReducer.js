import type { Reducer } from 'redux';
import type { Reservation } from '../types/Reservation';

type FetchReservationsSuccessAction = {
  +type: 'FETCH_RESERVATIONS_SUCCESS',
  +payload: {
    reservations: Array<Reservation>,
  },
};

type ReservationsState = {
  +[$PropertyType<Reservation, 'id'>]: Reservation,
};

type Action = FetchReservationsSuccessAction | empty;

type State = {
  reservations: ReservationsState,
};

const initialState: State = {
  reservations: {},
};

const reservationsReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action,
): State => {
  switch (action.type) {
    case 'FETCH_RESERVATIONS_SUCCESS':
      return {
        ...state,
        reservations: action.payload.reservations.reduce(
          (acc, reservation) => ({
            ...acc,
            [reservation.id]: reservation,
          }),
          {
            ...state.reservations,
          },
        ),
      };
    default:
      (action: empty); // eslint-disable-line no-unused-expressions
      return state;
  }
};

export default reservationsReducer;
export type { ReservationsState };
