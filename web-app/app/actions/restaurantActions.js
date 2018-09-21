type FetchRestaurantApiAction = {
  type: 'FETCH_RESTAURANT',
  endpoint: string,
};

const fetchRestaurant = (id: number): FetchRestaurantApiAction => ({
  type: 'FETCH_RESTAURANT',
  endpoint: `/api/restaurants/${id}`,
});

const fetchRestaurantByIndicator = (indicator: string): FetchRestaurantApiAction => ({
  type: 'FETCH_RESTAURANT',
  endpoint: `/api/restaurants?slug=${indicator}`,
});

export { fetchRestaurantByIndicator, fetchRestaurant };
