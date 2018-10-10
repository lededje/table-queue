import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import ListReservations from '../../components/ListReservations';

import restaurantResolver from '../../utils/restaurantResolver';

import { fetchReservationsByRestaurantId } from '../../actions/reservationActions';

import withRedux from '../../components/withRedux';
import withRestaurant from '../../components/withRestaurant';

import type { Restaurant } from '../../types/Restaurant';
import type { ReservationsState } from '../../reducers/reservationsReducer';

type Props = {
  restaurant: Restaurant,
  reservations: ReservationsState,
};

class Reservations extends React.PureComponent<Props> {
  static async getInitialProps({ store }) {
    const { selectedRestaurantId } = store.getState().request.state;
    await store.dispatch(fetchReservationsByRestaurantId({ restaurantId: selectedRestaurantId }));
  }

  render() {
    const { restaurant, reservations } = this.props;

    return <ListReservations restaurant={restaurant} reservations={reservations} />;
  }
}

const connectedComponent = connect(
  state => ({
    restaurants: state.restaurants,
    reservations: state.reservations,
  }),
  null,
  (stateProps, actions, ownProps) => ({
    ...ownProps,
    actions,
    restaurant: restaurantResolver(
      stateProps.restaurants.restaurants,
      ownProps.router.query.restaurantIndicator,
    ),
    reservations: stateProps.reservations.reservations,
  }),
)(Reservations);

export default withRedux(withRestaurant(withRouter(connectedComponent)));
