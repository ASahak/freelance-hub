import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPassword(email: string, url: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your Password',
      template: './reset-password',
      context: { url },
    });
    console.log(`Email sent to ${email}`);
  }
}
