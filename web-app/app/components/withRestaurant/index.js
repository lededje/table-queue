import * as React from 'react';
import isNaN from 'lodash/isNaN';
import hoistNonReactStatic from 'hoist-non-react-statics';

import { fetchRestaurantByIndicator, fetchRestaurant } from '../../actions/restaurantActions';

type Query = {
  +restaurantIndicator: string,
};

const withRestaurant = (WrappedComponent: React.Node): React.Node => hoistNonReactStatic(
  class extends React.Component<{}> {
    static async getInitialProps(...context) {
      const query: Query = context.query;
      const store = context.store;

      if (!store) {
        throw new Error('withRestaurant requires the use of withRedux before this one');
      }
      const { restaurantIndicator } = query;
      const id: number = parseInt(restaurantIndicator, 10);

      const action = isNaN(id)
        ? () => fetchRestaurantByIndicator(restaurantIndicator)
        : () => fetchRestaurant(id);

      await store.dispatch(action());

      if (typeof WrappedComponent.getInitialProps === 'function') {
        const props = await WrappedComponent.getInitialProps.apply(null, context);
        return props;
      }

      return {};
    }
  },
  WrappedComponent,
);

export default withRestaurant;
