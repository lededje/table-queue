const Router = require('koa-router');
const Sequelize = require('sequelize');

const models = require('../models');

const reservations = new Router();
const { formatSequelizeValidationError, formatGenericError } = require('../utils/formatErrors');

reservations.get('/:id', async (ctx, next) => {
  const reservation = await models.reservation.findById(ctx.params.id);

  ctx.body = reservation;
  await next();
});

reservations.post('/', async (ctx, next) => {
  const { mobileNumber, name } = ctx.request.body;

  const { body, status } = await models.reservation
    .createAndQueue({ mobileNumber, name })
    .then(reservation => ({ body: reservation, status: 200 }))
    .catch((error) => {
      switch (error.constructor) {
        case Sequelize.ValidationError:
          return { body: formatSequelizeValidationError(error), status: 400 };
        default:
          return { body: formatGenericError(), status: 500 };
      }
    });

  ctx.body = body;
  ctx.response.status = status;
  await next();
});

reservations.patch('/:id', async (ctx, next) => {
  const reservation = await models.reservation.findById(ctx.params.id);
  const updatedUser = await reservation.update(ctx.request.body);

  ctx.body = updatedUser;
  await next();
});

reservations.delete('/:id', async (ctx, next) => {
  const reservation = await models.reservation.findById(ctx.params.id);
  const deleted = await reservation.destroy();

  ctx.body = deleted;
  await next();
});

module.exports = reservations;
