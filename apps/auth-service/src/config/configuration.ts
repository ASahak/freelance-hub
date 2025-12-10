import { DEFAULT_PORT } from '../common/constants/global';
import { MICROSERVICES } from '@libs/constants/microservices';

export default () => ({
  port: MICROSERVICES.Users.port ?? DEFAULT_PORT,
  host: MICROSERVICES.Users.host,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  googleRedirectURI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  appOrigin: process.env.APP_ORIGIN,
  twoFactorSecret: process.env.TWO_FA_SECRET_KEY,
});
