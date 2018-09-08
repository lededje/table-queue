const Router = require('koa-router');

const router = new Router();

const users = require('./users');
const reservations = require('./reservations');
const healthcheck = require('./healthcheck');
const restaurants = require('./restaurants');

router.use('/', healthcheck.routes());
router.use('/users', users.routes());
router.use('/reservations', reservations.routes());
router.use('/restaurants', restaurants.routes());

module.exports = router;
