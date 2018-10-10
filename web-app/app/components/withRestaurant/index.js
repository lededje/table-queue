import * as React from 'react';
import isNaN from 'lodash/isNaN';
import get from 'lodash/get';

import { fetchRestaurantByIndicator, fetchRestaurant } from '../../actions/restaurantActions';
import { setRestaurantId } from '../../actions/requestActions';

type Query = {
  +restaurantIndicator: string,
};

const HoC = (
  WrappedComponent: React.StatelessFunctionalComponent<*>,
): React.StatelessFunctionalComponent<*> => {
  const withRestaurant = props => <WrappedComponent {...props} />;

  withRestaurant.getInitialProps = async (...context) => {
    const { query, store }: { query: Query } = context[0];

    if (!store) {
      throw new Error('withRestaurant requires the use of withRedux before this one');
    }
    const { restaurantIndicator } = query;
    const id: number = parseInt(restaurantIndicator, 10);

    const action = isNaN(id)
      ? () => fetchRestaurantByIndicator(restaurantIndicator)
      : () => fetchRestaurant(id);

    const matchedRestaurant = get(await store.dispatch(action()), 'payload', {});

    store.dispatch(setRestaurantId(matchedRestaurant.id));

    if (matchedRestaurant.status === 404) {
      const err = new Error();
      err.code = 'ENOENT';
      throw err;
    }

    let props = {
      restaurantId: matchedRestaurant.id,
    };

    if (typeof WrappedComponent.getInitialProps === 'function') {
      props = {
        ...props,
        ...(await WrappedComponent.getInitialProps.apply(null, context)),
      };
    }

    return props;
  };

  withRestaurant.displayName = `withRestaurant(${WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'})`;

  return withRestaurant;
};

export default HoC;
