import { Injectable } from '@nestjs/common';

@Injectable()
export class CoinsService {
  getBalance() {
    // TODO: Implement balance retrieval
    return 'This action returns the current balance';
  }

  getPackages() {
    // TODO: Implement packages retrieval
    return 'This action returns available coin packages';
  }

  getHistory() {
    // TODO: Implement history retrieval
    return 'This action returns coin usage history';
  }
} 