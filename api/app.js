const Koa = require("koa");

const router = require("./routes");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const koaqs = require("koa-qs");

const app = new Koa();

koaqs(app);

app
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
