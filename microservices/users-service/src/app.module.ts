import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './modules/users/users.module'
import { PrismaModule } from './modules/prisma/prisma.module'
import configuration from '@/config/configuration'
import { CookieModule } from '@/modules/cookie/cookie.module'

@Module({
  UsersModule,
  PrismaModule,
  ConfigModule.forRoot({
    load: [configuration]
  }),
  CookieModule,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
