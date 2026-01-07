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
    return { success: true };
  }

  async sendNewLoginAlert(
    email: string,
    data: { device: string; ip: string; time: string; manageUrl: string },
  ) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Security Alert: New Login Detected',
      template: './new-login',
      context: data,
    });
  }
}
