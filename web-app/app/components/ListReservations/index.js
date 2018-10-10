import * as React from 'react';

import type { Restaurant } from '../../types/Restaurant';
import type { ReservationsState } from '../../reducers/reservationsReducer';

type Props = {
  restaurant: Restaurant,
  reservations: ReservationsState,
};

class ListReservations extends React.PureComponent<Props> {
  render() {
    const { reservations, restaurant } = this.props;

    return (
      <div>
        <h1>{restaurant.name}</h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Status</th>
            <th>Time waited</th>
            <th>Actions</th>
          </tr>
          {Object.values(reservations).map(reservation => (
            <tr>
              <td>{reservation.name}</td>
              <td>{reservation.phoneNumber}</td>
              <td>{reservation.email}</td>
              <td>{restaurant.createdAt}</td>
              <td>Waiting for table</td>
              <td>
                <button>Table is ready</button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default ListReservations;
