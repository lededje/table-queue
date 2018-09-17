import { CREATE_RESERVATION } from './types';

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
