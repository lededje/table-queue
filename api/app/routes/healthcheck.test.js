import http from 'http';

import Koa from 'koa';
import request from 'supertest';
import bodyParser from 'koa-bodyparser';
import healthcheck from './healthcheck';

describe('Healthcheck', () => {
  it('should return healthy', () => {
    const app = new Koa();
    app.use(bodyParser());
    app.use(healthcheck.routes());

    return request(http.createServer(app.callback()))
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          healthy: true,
        });
      });
  });
});
