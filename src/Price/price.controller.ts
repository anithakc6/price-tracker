import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getHello(): string {
    return this.priceService.getHello();
  }

  @Get('hourly')
  async getHourlyPrices() {
    return this.priceService.getHourlyPrices();
  }
}
