import { Prisma } from '@ai-resume/db';

/**
 * Response for coin balance
 * */
export interface CoinBalanceResponse {
  coins: number;
}

/**
 * Represents a transaction item
 * */
export interface TransactionItem {
  id: string;
  type: 'CHARGE' | 'USAGE' | 'REFUND';
  name: string;
  price: number;
  createdAt: string;
  coinItemId?: string;
  purchasableItemId?: string;
  meta?: any;
}

/**
 * Response for using coins
 * */
export interface UseCoinResponse {
  success: boolean;
  remainingCoins: number;
}

/**
 * Represents a coin item with selected fields
 * */
export type CoinItem = Prisma.CoinItemGetPayload<{
  select: {
    id: true;
    name: true;
    coins: true;
    price: true;
    stripePriceId: true;
  };
}>;
