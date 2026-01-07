import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { MailService } from './mail.service';

@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly mailService: MailService) {}

  @MessagePattern({ cmd: 'sendResetPassword' })
  async handleResetPassword(@Payload() data: { email: string; url: string }) {
    return await this.mailService.sendResetPassword(data.email, data.url);
  }

  @EventPattern('sendLoginAlert')
  async handleLoginAlert(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      this.logger.log('Processing email for:', data.email);

      await this.mailService.sendNewLoginAlert(data.email, data);

      this.logger.log('Email sent to:', data.email);
      // Success: Tell RabbitMQ to delete the message
      channel.ack(originalMsg);
    } catch (error) {
      this.logger.error('Failed to send email:', error);

      const headers = originalMsg.properties.headers || {};
      const retryCount = headers['x-retry-count'] || 0;

      if (retryCount < 3) {
        console.warn(`Attempt ${retryCount + 1} failed. Retrying...`);

        // We copy the message, increment the counter, and send it back to the queue manually
        // Then we ACK the old message to remove it.
        channel.sendToQueue(
          originalMsg.fields.routingKey,
          originalMsg.content,
          {
            headers: { ...headers, 'x-retry-count': retryCount + 1 },
          },
        );
        channel.ack(originalMsg);
      } else {
        console.error('Max retries reached. Dropping message.', data);

        // We ACK it to remove it from the queue so it stops looping.
        // Ideally, you save this to a "failed_jobs" database table here.
        channel.ack(originalMsg);
      }
    }
  }
}
