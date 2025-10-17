import { MICROSERVICES } from '@libs/constants/microservices'

export default () => ({
  port: MICROSERVICES.Users.port,
  host: MICROSERVICES.Users.host,
  appOrigin: process.env.APP_ORIGIN,
})
