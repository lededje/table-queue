const express = require('express');
const next = require('next');
const morgan = require('morgan');
const { createServer } = require('http');

// const { proxyMiddleware } = require('./middleware/server');

const dev = process.env.NODE_ENV === 'development';

// Nasty way to extract the port out of the args passed in.
let port;
process.argv.forEach((arg, index, args) => {
  if (arg === '-p' && args[index + 1]) {
    port = parseInt(args[index + 1], 10);
  }
  return undefined;
});

port = port || 3000;

const app = next({
  dev,
  dir: './app',
});
const handle = app.getRequestHandler();

const logFormat = dev ? 'dev' : 'combined';

app.prepare().then(() => {
  const server = express();
  server.disable('x-powered-by');
  // server.use('/api', proxyMiddleware(process.env.API_PROXY_HOST));
  server.use(
    morgan(logFormat, {
      skip: req => /(on-demand-entries-ping|webpack)/.test(req.path),
    }),
  );

  server.get('/healthcheck', (req, res) => res.json({ healthy: true }));

  server.get('/:restaurantIndicator/reservations/new', (req, res) => app.render(req, res, '/reservations/new', {
    restaurantIndicator: req.params.restaurantIndicator,
  }));

  server.get('*', (req, res) => handle(req, res));

  createServer(server).listen(port, (err) => {
    if (err) throw err;
    const site = `http://localhost:${port}`;
    console.log(`> Ready on ${site}`); // eslint-disable-line no-console
  });
});
