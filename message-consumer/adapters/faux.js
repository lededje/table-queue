/* eslint-disable-next-line no-console */
const logMessage = ({ from, to, body }) => console.log(`
Buzz buzz, new sms:
To: ${to}:
\`\`\`
${body}
\`\`\`
From: ${from}
`) || Promise.resolve();

// This is a logger adapter that logs a message to the console so you can
// inspect it. It's much nicer and cheaper than waiting for an sms each time.

module.exports = logMessage;
