import { Module } from '@nestjs/common'
import { CookieService } from './cookie.service'
import { ConfigService } from '@nestjs/config'

@Module({
  providers: [CookieService, ConfigService]
})
export class CookieModule {}