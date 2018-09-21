import type { Reducer } from 'redux';
import type { Reservation } from '../types/Reservation';

type ReservationsState = {
  +[$PropertyType<Reservation, 'id'>]: Reservation,
};

type Action = empty;

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
    default:
      (action: empty); // eslint-disable-line no-unused-expressions
      return state;
  }
};

export default reservationsReducer;
export type { ReservationsState };
