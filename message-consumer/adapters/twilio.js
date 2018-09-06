const Twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

const twilioAdapter = ({ to, body, from }) => client.messages.create({
  body,
  to,
  from,
});

module.exports = twilioAdapter;
