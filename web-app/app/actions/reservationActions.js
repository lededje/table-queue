type CreateReservationApiAction = {
  action: 'CREATE_RESERVATION',
  endpoint: string,
  options: {
    method: 'POST',
    data: {
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
  action: 'CREATE_RESERVATION',
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
  action: 'FETCH_RESERVATIONS',
  endpoint: string,
};

const fetchReservationsByRestaurantId = ({
  restaurantId,
}: {
  restaurantId: number,
}): FetchReservationsByRestaurantIdApiAction => ({
  action: 'FETCH_RESERVATIONS',
  endpoint: `/api/reservations?restaurantId=${restaurantId}`,
});

export { createReservation, fetchReservationsByRestaurantId };
