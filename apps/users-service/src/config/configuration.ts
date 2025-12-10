import { MICROSERVICES } from '@libs/constants/microservices';
import { DEFAULT_PORT } from '../common/constants/global';

export default () => ({
  port: MICROSERVICES.Users.port ?? DEFAULT_PORT,
  host: MICROSERVICES.Users.host,
  appOrigin: process.env.APP_ORIGIN,
});
