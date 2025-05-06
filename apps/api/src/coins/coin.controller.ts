import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/request.types';
import { CoinService } from './coin.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CoinBalanceResponse, CoinItemsResponse, CoinTransactionsResponse } from '@ai-resume/types';

@Controller('coins')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  /**
   * Retrieves the current coin balance for the authenticated user.
   */
  @Get('balance')
  async getBalance(@Req() req: RequestWithUser): Promise<CoinBalanceResponse> {
    const userId = req.user.id;
    return this.coinService.getBalance(userId);
  }

  /**
   * Retrieves the transaction history for the authenticated user, including coin usage and purchases.
   */
  @Get('transactions')
  async getTransactions(@Req() req: RequestWithUser): Promise<CoinTransactionsResponse> {
    const userId = req.user.id;
    return this.coinService.getTransactions(userId);
  }

  /**
   * Retrieves the list of available coin items.
   */
  @Get('items')
  async getCoinItems(): Promise<CoinItemsResponse> {
    return this.coinService.getCoinItems();
  }
}
