import React, { PureComponent } from 'react';
import isNaN from 'lodash/isNaN';

import { fetchRestaurantByIndicator, fetchRestaurant } from '../../actions/restaurantActions';
import NewReservationContainer from '../../containers/NewReservation';
import withRedux from '../../components/withRedux';

class NewReservation extends PureComponent {
  static async getInitialProps({ query, store }) {
    const { restaurantIndicator } = query;
    const id = parseInt(restaurantIndicator, 10);

    const action = isNaN(id) ? fetchRestaurantByIndicator : fetchRestaurant;

    await store.dispatch(action(restaurantIndicator));

    return {};
  }

  render() {
    return <NewReservationContainer />;
  }
}

export default withRedux(NewReservation);
