import { FETCH_RESTAURANT, FETCH_RESTAURANT_BY_INDICATOR } from './types';

const fetchRestaurant = (id: number) => ({
  type: FETCH_RESTAURANT,
  endpoint: `/api/restaurants/${id}`,
});

const fetchRestaurantByIndicator = (indicator: string) => ({
  type: FETCH_RESTAURANT_BY_INDICATOR,
  endpoint: `/api/restaurants?slug=${indicator}`,
});

export { fetchRestaurantByIndicator, fetchRestaurant };
