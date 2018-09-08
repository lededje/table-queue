const Twilio = require('twilio');
const noop = require('lodash/noop');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioAdapter = (() => {
  if (!accountSid || !authToken) {
    return noop;
  }

  const client = new Twilio(accountSid, authToken);

  return ({ to, body, from }) => client.messages.create({
    body,
    to,
    from,
  });
})();

module.exports = twilioAdapter;
