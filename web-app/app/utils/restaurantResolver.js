import isNaN from 'lodash/isNaN';

import type { RestaurantsState } from '../reducers/restaurantsReducer';

const restaurantResolver = (restaurants: RestaurantsState, restaurantIdentifier: string) => {
  const isId = !isNaN(parseInt(restaurantIdentifier, 10));
  if (isId) {
    return restaurants[parseInt(restaurantIdentifier, 10)];
  }

  return Object.values(restaurants).find(restaurant => restaurant.slug === restaurantIdentifier);
};

export default restaurantResolver;
