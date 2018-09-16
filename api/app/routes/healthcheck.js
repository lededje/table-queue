const Router = require('koa-router');

const healthcheck = new Router();

healthcheck.get('/', async (ctx, next) => {
  ctx.body = { healthy: true };
  await next();
});

module.exports = healthcheck;
