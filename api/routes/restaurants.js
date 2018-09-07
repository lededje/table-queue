const Router = require('koa-router');

const models = require('../models');

const restaurants = new Router();

restaurants.get('/:id', async (ctx, next) => {
  const restaurant = await models.restaurants.findById(ctx.params.id);

  ctx.body = restaurant;
  await next();
});

restaurants.get('/', async (ctx, next) => {
  const { slug } = ctx.request.query;

  if (!slug) {
    ctx.response.status = 400;
    await next();
    return;
  }

  const matches = await models.restaurants.findAll({ where: { slug } });

  if (matches.length === 0) {
    ctx.response.status = 404;
    await next();
    return;
  }

  ctx.body = matches[0];
  await next();
});

module.exports = restaurants;
