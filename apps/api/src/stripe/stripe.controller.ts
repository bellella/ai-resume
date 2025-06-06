import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Headers,
  RawBody,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request, Response } from 'express';
import { CreateCheckoutSessionDto } from './dto/create-checkout-session.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/request.types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCheckoutSessionResponse } from '@ai-resume/types';

@Controller('stripe')
@ApiBearerAuth('access-token')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  /**
   * Creates a checkout session for the authenticated user.
   */
  @Post('checkout-session')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
    @Req() req: RequestWithUser
  ): Promise<CreateCheckoutSessionResponse> {
    const { priceId, coinItemId } = createCheckoutSessionDto;
    const url = await this.stripeService.createCheckoutSession(priceId, coinItemId, req.user.id);
    return { url };
  }

  /**
   * Handles incoming Stripe webhook events.
   */
  @Post('webhook')
  @HttpCode(200)
  async handleStripeWebhook(
    @Headers('stripe-signature') signature: string,
    @RawBody() rawBody: Buffer
  ) {
    return this.stripeService.handleWebhook(rawBody, signature);
  }
}
