import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './database/alert.entity';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { EmailModule } from '../Email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Alert]),
    EmailModule,
  ],
  providers: [AlertService],
  controllers: [AlertController],
  exports: [AlertService],
})
export class AlertModule {}