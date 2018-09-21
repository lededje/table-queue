import React, { PureComponent } from 'react';

import withRedux from '../../components/withRedux';
import withRestaurant from '../../components/withRestaurant';

class Reservations extends PureComponent<{}> {
  render() {
    return <div>rawr</div>;
  }
}

export default withRedux(withRestaurant(Reservations));
