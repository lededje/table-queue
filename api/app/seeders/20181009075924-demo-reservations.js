const seedReservations = [
  {
    id: 1,
    restaurantId: 1,
    name: 'Damian Black',
    phoneNumber: '07770774001',
    email: 'damian@example.com',
    createdAt: new Date('Wed Sep 09 2018 10:36:50 GMT+0100 (BST)'),
    updatedAt: new Date('Wed Sep 09 2018 10:36:50 GMT+0100 (BST)'),
  },
  {
    id: 2,
    restaurantId: 1,
    name: 'Steve Driver',
    phoneNumber: '07770774002',
    email: 'steve@example.com',
    createdAt: new Date('Wed Sep 09 2018 10:36:50 GMT+0100 (BST)'),
    updatedAt: new Date('Wed Sep 09 2018 10:36:50 GMT+0100 (BST)'),
  },
  {
    id: 3,
    restaurantId: 1,
    name: 'Jane Clark',
    phoneNumber: '07770774003',
    email: 'jane@example.com',
    createdAt: new Date('Wed Sep 09 2018 10:36:50 GMT+0100 (BST)'),
    updatedAt: new Date('Wed Sep 09 2018 10:36:50 GMT+0100 (BST)'),
  },
];

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('reservations', seedReservations, {}),

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('reservations', {
      [Sequelize.Op.or]: seedReservations.map(({ phoneNumber }) => ({ phoneNumber })),
    });
  },
};
