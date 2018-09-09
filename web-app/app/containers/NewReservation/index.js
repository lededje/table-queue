import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createReservation } from '../../actions/reservationActions';
import ReservationForm from '../../components/ReservationForm';

class NewReservation extends PureComponent {
  render() {
    const {
      restaurant, loading, name, phoneNumber, errors, createReservation,
    } = this.props;
    return (
      <>
        <h1>{`Reservation at ${(restaurant || {}).name}`}</h1>
        <ReservationForm loading={loading} onSubmit={createReservation} errors={errors} />
      </>
    );
  }
}

export { NewReservation };

export default connect(
  state => ({
    restaurant: state.restaurants.restaurants[2],
  }),
  dispatch => ({
    actions: bindActionCreators({ createReservation }, dispatch),
  }),
)(NewReservation);
