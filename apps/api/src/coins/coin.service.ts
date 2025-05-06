import {
  CoinBalanceResponse,
  CoinItemsResponse,
  CoinTransactionsResponse,
  UseCoinResponse,
} from '@ai-resume/types';
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoinService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Retrieves the coin balance for a user
   */
  async getBalance(userId: string): Promise<CoinBalanceResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { coins: true },
    });
    return { coins: user?.coins ?? 0 };
  }

  /**
   * Retrieves the transaction history for a user
   */
  async getTransactions(userId: string): Promise<CoinTransactionsResponse> {
    const result = await this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        type: true,
        name: true,
        price: true,
        createdAt: true,
        meta: true,
      },
    });
    return result.map((transaction) => ({
      ...transaction,
      meta: transaction.meta as { resumeId?: string },
    }));
  }

  /**
   * Retrieves the list of available coin items
   */
  async getCoinItems(): Promise<CoinItemsResponse> {
    return this.prisma.coinItem.findMany({
      select: {
        id: true,
        name: true,
        coins: true,
        price: true,
        stripePriceId: true,
      },
      orderBy: { coins: 'asc' },
    });
  }

  /**
   * Deducts coins from a user's balance
   */
  async deductCoins(tx: any, userId: string, coinCost: number): Promise<UseCoinResponse> {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user || user.coins < coinCost) {
      throw new BadRequestException('Not enough coins');
    }

    await tx.user.update({
      where: { id: userId },
      data: { coins: { decrement: coinCost } },
    });
    return { success: true, remainingCoins: user.coins - coinCost };
  }
}
