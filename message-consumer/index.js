/* eslint-disable class-methods-use-this */
const { Consumer } = require('redis-smq');

const fauxAdapter = require('./adapters/faux');
const twilioAdapter = require('./adapters/twilio');

const { FROM_MOBILE, ADAPTER } = process.env;

if (!ADAPTER) throw new Error('No adapter specified');

const adapters = {
  FAUX: fauxAdapter,
  TWILIO: twilioAdapter,
};

const config = require('./redis.conf');

const sendGreeting = ({ phoneNumber, name, cb }) => {
  const body = `Hello ${name}. You just asked for a table. We will let you know when it's ready`;

  return adapters[ADAPTER]({
    to: phoneNumber,
    body,
    from: FROM_MOBILE,
  })
    .then(() => cb())
    .catch(cb);
};

class QueueConsumer extends Consumer {
  consume(message, cb) {
    const { action, phoneNumber, name } = message;
    switch (action) {
      case 'RESERVATION_CREATED':
        return sendGreeting({ phoneNumber, name, cb });
      default:
        return cb(new Error(`Unknown message action: ${action}`));
    }
  }
}

QueueConsumer.queueName = 'reservations';

const consumer = new QueueConsumer(config);
consumer.run();

process.on('SIGTERM', () => {
  consumer.stop();
  process.exit(0);
});
