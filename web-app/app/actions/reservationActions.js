type CreateReservationApiAction = {
  type: 'CREATE_RESERVATION',
  endpoint: string,
  options: {
    method: 'POST',
    body: {
      restaurantId: number,
      name: string,
      phoneNumber: string,
      email?: string,
    },
  },
};

const createReservation = ({
  restaurantId,
  name,
  phoneNumber,
  email,
}: {
  restaurantId: number,
  name: string,
  phoneNumber: string,
  email: string,
}): CreateReservationApiAction => ({
  type: 'CREATE_RESERVATION',
  endpoint: '/api/reservations',
  options: {
    method: 'POST',
    body: {
      restaurantId,
      name,
      phoneNumber,
      email,
    },
  },
});

type FetchReservationsByRestaurantIdApiAction = {
  type: 'FETCH_RESERVATIONS',
  endpoint: string,
};

const fetchReservationsByRestaurantId = ({
  restaurantId,
}: {
  restaurantId: number,
}): FetchReservationsByRestaurantIdApiAction => ({
  type: 'FETCH_RESERVATIONS',
  endpoint: `/api/reservations?restaurantId=${restaurantId}`,
});

export { createReservation, fetchReservationsByRestaurantId };
