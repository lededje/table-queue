const get = require('lodash/get');
const snake = require('to-snake-case');

const formatErrors = (sequalizeError) => {
  const errors = (() => {
    switch (sequalizeError.name) {
      case 'SequelizeValidationError': {
        return sequalizeError.errors.reduce(
          (acc, error) => ({
            ...acc,
            [error.path]: [...get(acc, error.path, []), snake(error.validatorKey).toUpperCase()],
          }),
          {},
        );
      }
      default: {
        return null;
      }
    }
  })();

  return {
    errors,
  };
};

module.exports = formatErrors;
