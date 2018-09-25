const { Producer } = require('redis-smq');
const redisConf = require('../redis.conf');

const producer = new Producer('reservations', redisConf);

const pushReservationToQueue = ({ phoneNumber, name, restaurantId }) => new Promise((resolve, reject) => {
  producer.produceWithTTL(
    {
      type: 'RESERVATION',
      action: 'RESERVATION_CREATED',
      restaurantId,
      phoneNumber,
      name,
    },
    1000 * 60 * 60 * 24,
    (err) => {
      if (err) reject(err);
      resolve();
    },
  );
});

export default (sequelize, DataTypes) => {
  const Reservation = sequelize.define('reservations', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isName(value) {
          if (!/^[a-z_'\- ]+$/.test(value)) {
            throw new Error("Must be a string that containers a-z, ', <space> or - characters");
          }
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isNumeric: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
  });

  function createAndQueue({ phoneNumber, name, restaurantId }) {
    const payload = { phoneNumber, name, restaurantId };

    return sequelize.transaction(transaction => this.create(payload, { transaction }).then(newReservation => pushReservationToQueue(payload).then(() => newReservation)));
  }

  Reservation.createAndQueue = createAndQueue;

  return Reservation;
};
