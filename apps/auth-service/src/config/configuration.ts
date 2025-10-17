import { DEFAULT_PORT } from '../common/constants/global';
import { MICROSERVICES } from '@libs/constants/microservices';

export default () => ({
  port: MICROSERVICES.Users.port ?? DEFAULT_PORT,
  host: MICROSERVICES.Users.host,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  googleRedirectURI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  appOrigin: process.env.APP_ORIGIN,
})
