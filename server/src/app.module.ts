import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from '@/modules/auth/auth.module'
import { UsersModule } from '@/modules/users/users.module'
import { PrismaModule } from '@/modules/prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { CookieModule } from '@/modules/cookie/cookie.module'
import configuration from '@/config/configuration'

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({
      load: [configuration]
    }),
    CookieModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
