import { DEFAULT_PORT } from '@/common/constants/global'

export default () => ({
  port: process.env.PORT ?? DEFAULT_PORT,
  host: process.env.HOST,
  appOrigin: process.env.APP_ORIGIN,
})
