const noop = require('lodash/noop');

const proxyMiddleware = (proxyHost) => {
  if (proxyHost) {
    console.warn(`Proxy middleware enabled (${proxyHost})`);
    const httpProxyMiddleware = require('http-proxy-middleware'); // eslint-disable-line global-require, import/no-extraneous-dependencies
    return httpProxyMiddleware({
      changeOrigin: true,
      cookieDomainRewrite: '',
      logLevel: 'warn',
      router: {
        'http://nginx:2000': 'http://nginx:2000',
      },
    });
  }
  return noop;
};

const fontCorsMiddleware = (req, res, nextMiddleware) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  nextMiddleware();
};

module.exports = {
  fontCorsMiddleware,
  proxyMiddleware,
};
