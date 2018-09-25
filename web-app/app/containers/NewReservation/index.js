import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import get from 'lodash/get';
import { withRouter } from 'next/router';

import restaurantResolver from '../../utils/restaurantResolver';

import type { Restaurant } from '../../types/Restaurant';

import { createReservation } from '../../actions/reservationActions';
import ReservationForm from '../../components/ReservationForm';

type Props = {
  +router: {
    +query: {
      +restaurantIndicator: string,
    },
  },
  +restaurant: Restaurant,
  +actions: {
    +createReservation: typeof createReservation,
  },
};

class NewReservation extends PureComponent<Props> {
  submitReservation = (userData: { name: string, phoneNumber: string }) => {
    const { name, phoneNumber } = userData;
    const { actions, restaurant } = this.props;
    return actions.createReservation({
      restaurantId: restaurant.id,
      name,
      phoneNumber,
    });
  };

  render() {
    const { restaurant } = this.props;

    const restaurantName: string = get(restaurant, 'name', '');

    return (
      <>
        <h1>{`Reservation at ${restaurantName}`}</h1>
        <ReservationForm submitReservation={this.submitReservation} />
      </>
    );
  }
}

export { NewReservation };

const connectedComponent = connect(
  state => ({
    restaurants: state.restaurants,
  }),
  (dispatch: Dispatch) => ({
    actions: bindActionCreators({ createReservation }, dispatch),
  }),
  (stateProps, actions, ownProps) => ({
    ...ownProps,
    ...actions,
    restaurant: restaurantResolver(
      stateProps.restaurants.restaurants,
      ownProps.router.query.restaurantIndicator,
    ),
  }),
)(NewReservation);

export default withRouter(connectedComponent);
