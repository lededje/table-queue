import * as React from 'react';

import NewReservationContainer from '../../containers/NewReservation';
import withRestaurant from '../../components/withRestaurant';
import withRedux from '../../components/withRedux';

const NewReservation = (): React.Node => <NewReservationContainer />;

export default withRedux(withRestaurant(NewReservation));
