import { DEFAULT_PORT } from '../common/constants/global';
import { MICROSERVICES } from '@libs/constants/microservices';

export default () => ({
  port: MICROSERVICES.Mail.port ?? DEFAULT_PORT,
  host: MICROSERVICES.Mail.host,
  mailHost: process.env.MAIL_HOST,
  mailUser: process.env.MAIL_USER,
  mailPassword: process.env.MAIL_PASSWORD,
  rabbitMQ: {
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    host: process.env.RABBITMQ_HOST,
    port: process.env.RABBITMQ_PORT,
    queueToken: process.env.RABBITMQ_QUEUE,
  },
});
