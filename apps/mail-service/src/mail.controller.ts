import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('sendResetPassword')
  async handleResetPassword(@Payload() data: { email: string; url: string }) {
    await this.mailService.sendResetPassword(data.email, data.url);
  }
}
