import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './database/price.entity';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { EmailModule } from '../Email/email.module';
import { AlertModule } from 'src/Alert/alert.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Price]),
    EmailModule,
    AlertModule,
  ],
  providers: [PriceService],
  controllers: [PriceController],
  exports: [PriceService],
})
export class PriceModule {}