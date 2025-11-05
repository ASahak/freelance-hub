import { DEFAULT_PORT } from '../common/constants/global';

export default () => ({
  port: process.env.PORT ?? DEFAULT_PORT,
  appOrigin: process.env.APP_ORIGIN,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  database: {
    host: process.env.DATABASE_HOST,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});
