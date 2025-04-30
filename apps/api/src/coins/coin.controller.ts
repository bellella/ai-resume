import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/request.types';
import { CoinService } from './coin.service';

@Controller('coins')
@UseGuards(JwtAuthGuard)
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  /**
   * Get user's current coin balance
   */
  @Get('balance')
  async getBalance(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.coinService.getBalance(userId);
  }

  /**
   * Get user's transaction history (coin usage & purchases)
   */
  @Get('transactions')
  async getTransactions(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.coinService.getTransactions(userId);
  }

  @Get('items')
  async getCoinItems() {
    return this.coinService.getCoinItems();
  }
}
