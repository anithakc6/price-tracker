import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailService: MailerService) {}

  async sendPriceAlert(chain: string, currentPrice: number, oldPrice: number) {
    const message = `The price of ${chain} has increased significantly!
    Previous price: $${oldPrice}
    Current price: $${currentPrice}
    Percentage increase: ${(((currentPrice - oldPrice) / oldPrice) * 100).toFixed(2)}%`;

    await this.mailService.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_TO,
      subject: `Price Alert: ${chain} price increased by >3%`,
      text: message,
    });
  }

  async sendTargetPriceAlert(email: string, chain: string, targetPrice: number) {
    const message = `Your price alert for ${chain} has been triggered!
    Target price: $${targetPrice} has been reached.`;

    await this.mailService.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Target Price Alert: ${chain} reached $${targetPrice}`,
      text: message,
    });
  }
}