import { Controller, Get, UseGuards } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('coins')
@UseGuards(JwtAuthGuard)
export class CoinsController {
  constructor(private readonly coinsService: CoinsService) {}

  @Get('balance')
  getBalance() {
    return this.coinsService.getBalance();
  }

  @Get('packages')
  getPackages() {
    return this.coinsService.getPackages();
  }

  @Get('history')
  getHistory() {
    return this.coinsService.getHistory();
  }
}
