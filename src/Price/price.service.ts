import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Price } from './database/price.entity';
import { EmailService } from '../Email/email.service';
import Moralis from 'moralis';
import { AlertService } from 'src/Alert/alert.service';

@Injectable()
export class PriceService {
  getHello(): string {
    return 'Hello World!';
  } 

  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    private emailService: EmailService,
    private alertService: AlertService,
  ) {
    Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async fetchPrices() {
    const chains = ['ethereum', 'polygon'];
    
    for (const chain of chains) {
      const response = await Moralis.EvmApi.token.getTokenPrice({
        address: chain === 'ethereum' ? process.env.WETH_ADDRESS : process.env.MATIC_ADDRESS,
      });
      
      const price = new Price();
      price.chain = chain;
      price.price = response.result.usdPrice;
      await this.priceRepository.save(price);

      const oneHourAgo = new Date(Date.now() - 3600000);
      const oldPrice = await this.priceRepository.findOne({
        where: {
          chain,
          timestamp: LessThanOrEqual(oneHourAgo)
        },
        order: {
          timestamp: 'DESC'
        }
      });

      if (oldPrice.price && ((price.price - oldPrice.price) / oldPrice.price) > 0.03) 
        {
        await this.emailService.sendPriceAlert(chain, price.price, oldPrice.price);
      }
      await this.alertService.checkAlerts(chain,price.price);
    }
  }

  async getHourlyPrices() {
    const last24Hours = new Date(Date.now() - 24 * 3600000);
    return this.priceRepository.find({
      where: {
        timestamp: MoreThanOrEqual(last24Hours),
        chain: In(['ethereum', 'bitcoin'])
      },
      order: {
        timestamp: 'DESC',
      },
    });
  }
}
