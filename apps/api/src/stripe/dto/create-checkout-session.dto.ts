import { IsString } from 'class-validator';
import { CreateCheckoutSessionRequest } from '@ai-resume/types';
export class CreateCheckoutSessionDto implements CreateCheckoutSessionRequest {
  @IsString()
  priceId: string;

  @IsString()
  coinItemId: string;
}
