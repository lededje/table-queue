const get = require('lodash/get');
const snake = require('to-snake-case');

const formatSequelizeValidationError = sequelizeValidationError => sequelizeValidationError.errors.reduce(
  (acc, error) => ({
    ...acc,
    [error.path]: [...get(acc, error.path, []), snake(error.validatorKey).toUpperCase()],
  }),
  {},
);

const formatGenericError = () => ({
  _: 'GENERIC_SERVER_ERROR',
});

module.exports = {
  formatSequelizeValidationError,
  formatGenericError,
};
