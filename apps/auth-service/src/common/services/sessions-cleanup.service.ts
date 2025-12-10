import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthService } from '@apps/auth-service/src/auth.service';

export class SessionCleanupService {
  constructor(private readonly authService: AuthService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    await this.authService.clearExpiredSessions();
  }
}
