import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
      apiVersion: '2025-03-31.basil',
    });
  }

  /**
   * Creates a checkout session for purchasing coins
   */
  async createCheckoutSession(priceId: string, coinItemId: string, userId: string) {
    // Creates a checkout session for purchasing coins
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'], // Only allow card payments
      line_items: [
        {
          price: priceId, // Use registered Stripe Price ID
          quantity: 1,
        },
      ],
      metadata: {
        userId,
        coinItemId,
      },
      success_url: `${this.configService.get('WEB_URL')}/coins`, // Redirect after success
      cancel_url: `${this.configService.get('WEB_URL')}/coins`, // Redirect after cancel
    });

    return session.url;
  }

  /**
   * Handles Stripe webhook events
   */
  async handleWebhook(rawBody: Buffer, signature: string) {
    // Handles Stripe webhook events
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    let event: Stripe.Event;
    try {
      if (!endpointSecret) {
        throw new Error('Stripe webhook secret is not configured');
      }
      // Verify and construct the webhook event
      event = this.stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const coinItemId = session.metadata?.coinItemId;

      if (!userId || !coinItemId) {
        throw new BadRequestException('Invalid session metadata');
      }

      const coinItem = await this.prisma.coinItem.findUnique({
        where: { id: coinItemId },
      });

      if (!coinItem) {
        throw new BadRequestException('Coin item not found');
      }

      // Update user's coin balance and create a transaction record
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          coins: { increment: coinItem.coins },
          transactions: {
            create: {
              name: `Purchase ${coinItem.coins} coins`,
              type: 'CHARGE',
              price: coinItem.coins,
              coinItemId: coinItem.id,
            },
          },
        },
      });
    }

    return { received: true };
  }
}
