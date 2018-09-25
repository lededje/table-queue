import * as React from 'react';
import isNaN from 'lodash/isNaN';

import { fetchRestaurantByIndicator, fetchRestaurant } from '../../actions/restaurantActions';

type Query = {
  +restaurantIndicator: string,
};

const withRestaurant = (WrappedComponent: React.ComponentType<*>): React.ComponentType<*> => class extends React.Component<{}> {
  static async getInitialProps(...context) {
    console.log('mounting...');
    const { query, store }: { query: Query } = context[0];

    if (!store) {
      throw new Error('withRestaurant requires the use of withRedux before this one');
    }
    const { restaurantIndicator } = query;
    const id: number = parseInt(restaurantIndicator, 10);

    const action = isNaN(id)
      ? () => fetchRestaurantByIndicator(restaurantIndicator)
      : () => fetchRestaurant(id);

    const matchedRestaurant = await store.dispatch(action());

    if (matchedRestaurant.status === 404) {
      const err = new Error();
      err.code = 'ENOENT';
      throw err;
    }

    if (typeof WrappedComponent.getInitialProps === 'function') {
      const props = await WrappedComponent.getInitialProps.apply(null, context);
      return props;
    }

    return {};
  }

  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default withRestaurant;
