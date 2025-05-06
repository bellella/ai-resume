import { Prisma } from '@ai-resume/db';

/**
 * Response for coin balance
 * */
export type CoinBalanceResponse = {
  coins: number;
};

/**
 * Response for coin transactions
 * */
export type CoinTransactionsResponse = TransactionItem[];

/**
 * Response for coin items
 * */
export type CoinItemsResponse = CoinItem[];

/**
 * Represents a transaction item
 * */
export type TransactionItem = Prisma.TransactionGetPayload<{
  select: {
    id: true;
    type: true;
    name: true;
    price: true;
    createdAt: true;
  };
}> & {
  meta: {
    resumeId?: string;
  };
};

/**
 * Response for using coins
 * */
export type UseCoinResponse = {
  success: boolean;
  remainingCoins: number;
};

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
