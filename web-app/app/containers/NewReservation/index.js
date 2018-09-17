import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import get from 'lodash/get';

import { createReservation } from '../../actions/reservationActions';
import ReservationForm from '../../components/ReservationForm';

type Props = {
  restaurant: {
    id: number,
    name: string,
  },
  loading: boolean,
  errors: {},
  actions: {
    createReservation: typeof createReservation,
  },
};

class NewReservation extends PureComponent<Props> {
  submitReservation = (userData: { name: string, phoneNumber: string }) => {
    const { name, phoneNumber } = userData;
    const { actions, restaurant } = this.props;
    actions.createReservation({
      restaurantId: restaurant.id,
      name,
      phoneNumber,
    });
  };

  render() {
    const { restaurant, loading, errors } = this.props;

    const restaurantName: string = get(restaurant, 'name', '');

    return (
      <>
        <h1>{`Reservation at ${restaurantName}`}</h1>
        <ReservationForm
          loading={loading}
          submitReservation={this.submitReservation}
          errors={errors}
        />
      </>
    );
  }
}

export { NewReservation };

export default connect(
  state => ({
    restaurant: state.restaurants.restaurants[2],
  }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators({ createReservation }, dispatch),
  }),
)(NewReservation);
