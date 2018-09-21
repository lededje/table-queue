import React, { PureComponent } from 'react';

import NewReservationContainer from '../../containers/NewReservation';
import withRestaurant from '../../components/withRestaurant';
import withRedux from '../../components/withRedux';

class NewReservation extends PureComponent<{}> {
  render() {
    return <NewReservationContainer />;
  }
}

export default withRestaurant(withRedux(NewReservation));
