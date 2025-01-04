import { Body, Controller, Post } from '@nestjs/common';
import { SwapService } from './swap.service';
import { SwapRateDto } from './swap.schema';

@Controller('swap')
export class SwapController {
  constructor(private readonly swapService: SwapService) {}

  @Post('rate')
 async getSwapRate(@Body() data: SwapRateDto) {
   return this.swapService.getSwapRate(data.ethAmount);
 }
}
