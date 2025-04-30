import { Prisma } from '@ai-resume/db';

export interface CoinBalanceResponse {
  coins: number;
}

export interface TransactionItem {
  id: string;
  type: 'CHARGE' | 'USAGE' | 'REFUND';
  name: string;
  price: number;
  createdAt: string;
  coinItemId?: string;
  purchasableItemId?: string;
}

export interface UseCoinResponse {
  success: boolean;
  remainingCoins: number;
}

export type CoinItem = Prisma.CoinItemGetPayload<{
  select: {
    id: true;
    name: true;
    coins: true;
    price: true;
    stripePriceId: true;
  };
}>;
