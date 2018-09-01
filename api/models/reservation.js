module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('reservation', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
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

  return User;
};
