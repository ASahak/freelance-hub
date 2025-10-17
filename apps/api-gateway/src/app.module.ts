import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { UsersController } from './modules/users/users.controller'
import { UsersProxyModule } from './modules/proxy/user-proxy.module';
import { AuthProxyModule } from './modules/proxy/auth-proxy.module';
import { AuthModule } from './modules/auth/auth.module';
import { CookieModule } from './modules/cookie/cookie.module';
import { FilesService } from './modules/files/files.service';
import { CloudinaryService } from './modules/cloudinary/cloudinary.service';
import { AuthController } from './modules/auth/auth.controller';
import { CookieService } from './modules/cookie/cookie.service';
import { FilesModule } from '@apps/api-gateway/src/modules/files/files.module';

@Module({
  imports: [
    FilesModule,
    UsersProxyModule,
    AuthProxyModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: './apps/api-gateway/.env',
    }),
    AuthModule,
    CookieModule,
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    AppService,
  ]
})
export class AppModule {}
