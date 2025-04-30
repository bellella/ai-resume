import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoinService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { coins: true },
    });
    return { coins: user?.coins ?? 0 };
  }

  async getTransactions(userId: string) {
    return this.prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCoinItems() {
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

  async deductCoins(tx: any, userId: string, coinCost: number) {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user || user.coins < coinCost) {
      throw new BadRequestException('Not enough coins');
    }

    await tx.user.update({
      where: { id: userId },
      data: { coins: { decrement: coinCost } },
    });
  }
}
