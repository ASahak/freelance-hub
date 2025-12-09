import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersController } from './modules/users/users.controller';
import { UsersProxyModule } from './modules/proxy/user-proxy.module';
import { AuthProxyModule } from './modules/proxy/auth-proxy.module';
import { AuthModule } from './modules/auth/auth.module';
import { CookieModule } from './modules/cookie/cookie.module';
import { AuthController } from './modules/auth/auth.controller';
import { FilesModule } from './modules/files/files.module';
import { SseService } from './common/services/sse.service';

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
  providers: [AppService, SseService],
  exports: [SseService],
})
export class AppModule {}
