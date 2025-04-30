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

@Controller('stripe')
@ApiBearerAuth('access-token')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('checkout-session')
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Body() createCheckoutSessionDto: CreateCheckoutSessionDto,
    @Req() req: RequestWithUser,
    @Res() res: Response
  ) {
    const { priceId, coinItemId } = createCheckoutSessionDto;
    const url = await this.stripeService.createCheckoutSession(priceId, coinItemId, req.user.id);
    return res.json({ url });
  }

  @Post('webhook')
  @HttpCode(200)
  async handleStripeWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
    @RawBody() rawBody: Buffer
  ) {
    return this.stripeService.handleWebhook(rawBody, signature);
  }
}
