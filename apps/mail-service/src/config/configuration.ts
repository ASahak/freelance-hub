import { DEFAULT_PORT } from '../common/constants/global';
import { MICROSERVICES } from '@libs/constants/microservices';

export default () => ({
  port: MICROSERVICES.Mail.port ?? DEFAULT_PORT,
  host: MICROSERVICES.Mail.host,
  mailHost: process.env.MAIL_HOST,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
});
