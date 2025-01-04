import { ApiProperty } from '@nestjs/swagger';

export class SwapRateDto {
 @ApiProperty()
 ethAmount: number;
}