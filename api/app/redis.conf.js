module.exports = {
  namespace: 'table-queue',
  redis: {
    host: 'redis',
    port: 6379,
    connect_timeout: 3600000,
  },
  log: {
    enabled: 0,
    options: {
      level: 'trace',
    },
  },
  monitor: {
    enabled: true,
    host: '127.0.0.1',
    port: 3000,
  },
};
