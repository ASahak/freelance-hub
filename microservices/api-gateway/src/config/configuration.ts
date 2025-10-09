import { DEFAULT_PORT } from '@/common/constants/global'

export default () => ({
  port: process.env.PORT ?? DEFAULT_PORT,
  jwtSecret: process.env.JWT_SECRET,
  googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  googleRedirectURI: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  appOrigin: process.env.APP_ORIGIN,
  database: {
    host: process.env.DATABASE_HOST
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  usersService: {
    host: process.env.USERS_SERVICE_HOST,
    port: process.env.USERS_SERVICE_PORT,
  }
})
