import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailService } from '../Email/email.service';
import { Alert } from './database/alert.entity';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    private emailService: EmailService,
  ) {}

  async createAlert(chain: string, targetPrice: number, email: string) {
    const alert = new Alert();
    alert.chain = chain;
    alert.targetPrice = targetPrice;
    alert.email = email;
    alert.isTriggered = false;
    return this.alertRepository.save(alert);
  }

  async checkAlerts(chain: string, currentPrice: number) {
    const alerts = await this.alertRepository.find({
      where: {
        chain,
        isTriggered: false,
      },
    });

    for (const alert of alerts) {
      if (currentPrice >= alert.targetPrice) {
        await this.emailService.sendTargetPriceAlert(
          alert.email,
          alert.chain,
          alert.targetPrice,
        );
        alert.isTriggered = true;
        await this.alertRepository.save(alert);
      }
    }
  }
}