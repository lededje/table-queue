const seedRestaurants = [
  {
    slug: 'byron',
    name: 'Byron',
    phoneNumber: '+44000000001',
    email: 'hello@byron.com',
    createdAt: new Date('Wed Sep 05 2018 10:36:50 GMT+0100 (BST)'),
    updatedAt: new Date('Wed Sep 05 2018 10:36:50 GMT+0100 (BST)'),
  },
  {
    slug: 'honest-burgers',
    name: 'Honest Burgers',
    phoneNumber: '+44000000002',
    email: 'hello@honestburgers.com',
    createdAt: new Date('Wed Sep 05 2018 10:36:50 GMT+0100 (BST)'),
    updatedAt: new Date('Wed Sep 05 2018 10:36:50 GMT+0100 (BST)'),
  },
  {
    slug: 'the-ivy',
    name: 'The Ivy',
    phoneNumber: '+44000000003',
    email: 'hello@theivy.com',
    createdAt: new Date('Wed Sep 05 2018 10:36:50 GMT+0100 (BST)'),
    updatedAt: new Date('Wed Sep 05 2018 10:36:50 GMT+0100 (BST)'),
  },
];

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('restaurants', seedRestaurants, {}),

  // Delete all seeds by the phone number which is unique
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('restaurants', {
    [Sequelize.Op.or]: seedRestaurants.map(({ phoneNumber }) => ({ phoneNumber })),
  }),
};
