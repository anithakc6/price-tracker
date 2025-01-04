import { ApiProperty } from '@nestjs/swagger';

export class CreateAlertDto {
  @ApiProperty()
  chain: string;

  @ApiProperty()
  targetPrice: number;

  @ApiProperty()
  email: string;
}