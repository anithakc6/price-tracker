import { Controller, Post, Body } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './alert.schema';

@Controller('alerts')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async createAlert(
    @Body() data: CreateAlertDto
  ) {
    return this.alertService.createAlert(
      data.chain,
      data.targetPrice,
      data.email
    );
  }
}