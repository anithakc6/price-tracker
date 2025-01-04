import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriceModule } from './Price/price.module';
import { AlertModule } from './Alert/alert.module';
import { SwapModule } from './Swap/swap.module';
import { EmailModule } from './Email/email.module';
import { Price } from './Price/database/price.entity';
import { Alert } from './Alert/database/alert.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Price, Alert],
      synchronize: true,
      logging: true,
    }),
    ScheduleModule.forRoot(),
    PriceModule,
    AlertModule,
    SwapModule,
    EmailModule,
  ],
})
export class AppModule {}