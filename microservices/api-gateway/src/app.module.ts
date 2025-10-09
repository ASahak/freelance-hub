import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configuration from '@/config/configuration'
import { UsersController } from '@/modules/users/users.controller'
import { UsersProxyModule } from '@/modules/proxy/user-proxy.module';
import { AuthProxyModule } from '@/modules/proxy/auth-proxy.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { CookieModule } from '@/modules/cookie/cookie.module';

@Module({
  imports: [
    UsersProxyModule,
    AuthProxyModule,
    ConfigModule.forRoot({
      load: [configuration]
    }),
    AuthModule,
    CookieModule,
  ],
  controllers: [AppController, UsersController],
  providers: [
    AppService
  ]
})
export class AppModule {}
