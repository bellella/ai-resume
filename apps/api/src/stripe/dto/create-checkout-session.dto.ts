import { IsString } from 'class-validator';

export class CreateCheckoutSessionDto {
  @IsString()
  priceId: string;

  @IsString()
  coinItemId: string;
}
