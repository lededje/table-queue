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
  email?: string,
}): CreateReservationApiAction => ({
  action: 'CREATE_RESERVATION',
  endpoint: '/api/reservation',
  options: {
    method: 'POST',
    data: {
      restaurantId,
      name,
      phoneNumber,
      email,
    },
  },
});

export { createReservation };
