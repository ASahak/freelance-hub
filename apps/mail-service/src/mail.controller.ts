import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'sendResetPassword' })
  async handleResetPassword(@Payload() data: { email: string; url: string }) {
    return await this.mailService.sendResetPassword(data.email, data.url);
  }

  @MessagePattern({ cmd: 'sendLoginAlert' })
  async handleLoginAlert(@Payload() data: any) {
    return await this.mailService.sendNewLoginAlert(data.email, data);
  }
}
