import { CREATE_RESERVATION } from './types';

const createReservation = ({
  restaurantId, name, phoneNumber, email,
}) => ({
  action: CREATE_RESERVATION,
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
