import { FETCH_RESTAURANT, FETCH_RESTAURANT_BY_INDICATOR } from './types';

const fetchRestaurant = id => ({
  type: FETCH_RESTAURANT,
  endpoint: `/api/restaurants/${id}`,
});

const fetchRestaurantByIndicator = indicator => ({
  type: FETCH_RESTAURANT_BY_INDICATOR,
  endpoint: `/api/restaurants?slug=${indicator}`,
});

export { fetchRestaurantByIndicator, fetchRestaurant };
