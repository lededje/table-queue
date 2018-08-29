const Router = require('koa-router');

const reservations = new Router();

const models = require('../models');

reservations.get('/:id', async (ctx, next) => {
  const reservation = await models.reservation.findById(ctx.params.id);

  ctx.body = reservation;
  await next();
});

reservations.post('/', async (ctx, next) => {
  const reservation = await models.reservation.create(ctx.request.body);

  ctx.body = reservation;
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
