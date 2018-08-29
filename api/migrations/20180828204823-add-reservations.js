module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Reservations', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
  }),

  down: queryInterface => queryInterface.dropTable('Reservations'),
};
