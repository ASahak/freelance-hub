import { DEFAULT_PORT } from '@/common/constants/global'

export default () => ({
  port: process.env.PORT ?? DEFAULT_PORT,
  jwtSecret: process.env.JWT_SECRET,
  database: {
    host: process.env.DATABASE_HOST
  }
})
