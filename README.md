# Table Queue

## Quick links

- [Table Queue in docker](http://localhost:2000)
- [PGAdmin in docker](http://localhost:8080)
- [Redis commander in docker](http://localhost:8081)

## Environment variables

| Variable          | Value                         | Description                               |
| ----------------- | ----------------------------- | ----------------------------------------- |
| NODE_ENV          | enum(production, development) |                                           |
| TWILIO_SID        | String                        |                                           |
| TWILIO_AUTH_TOKEN | String                        |                                           |
| FROM_MOBILE       | String                        | Mobile number to send messages from       |
| ADAPTER           | enum(FAUX, TWILIO)            | SMS adapter to use. Faux in dev           |
| API               | String                        | The uri of the api e.g: http://nginx:2000 |
