const Router = require('koa-router');

const router = new Router();

const users = require('./users');
const reservations = require('./reservations');
const healthcheck = require('./healthcheck');

router.use('/', healthcheck.routes());
router.use('/users', users.routes());
router.use('/reservations', reservations.routes());

module.exports = router;
