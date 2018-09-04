const { Producer } = require("redis-smq");
const redisConf = require("../redis.conf");

const producer = new Producer("reservations", redisConf);

const pushReservationToQueue = ({ mobileNumber, name }) =>
  new Promise((resolve, reject) => {
    producer.produceWithTTL(
      {
        type: "RESERVATION",
        mobileNumber,
        name
      },
      1000 * 60 * 60 * 24,
      err => {
        if (err) reject(err);
        resolve();
      }
    );
  });

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("reservation", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isName(value) {
          if (!/^[a-z_'\- ]+$/.test(value)) {
            throw new Error(
              "Must be a string that containers a-z, ', <space> or - characters"
            );
          }
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    }
  });

  function createAndQueue({ phoneNumber, name }) {
    const payload = { phoneNumber, name };

    return sequelize.transaction(transaction =>
      this.create(payload, { transaction }).then(newReservation =>
        pushReservationToQueue(payload).then(() => newReservation)
      )
    );
  }

  User.createAndQueue = createAndQueue;

  return User;
};
