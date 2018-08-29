module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("reservation", {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    }
  });

  return User;
};
