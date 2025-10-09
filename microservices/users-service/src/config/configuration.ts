import { DEFAULT_PORT } from '@/common/constants/global'

export default () => ({
  port: process.env.PORT ?? DEFAULT_PORT,
  jwtSecret: process.env.JWT_SECRET,
  appOrigin: process.env.APP_ORIGIN,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  }
})
