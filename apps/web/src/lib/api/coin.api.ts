import {
  CoinBalanceResponse,
  CoinItemsResponse,
  CoinTransactionsResponse,
  UseCoinResponse,
} from '@ai-resume/types';
import { api } from './ky';

/**
 * Get user's coin balance
 */
export const getCoinBalance = async (): Promise<CoinBalanceResponse> => {
  return await api.get('api/coins/balance').json();
};

/**
 * Get user's coin transaction history
 */
export const getCoinTransactions = async (): Promise<CoinTransactionsResponse> => {
  return await api.get('api/coins/transactions').json();
};

/**
 * Get purchasable coin items
 */
export const getCoinItems = async (): Promise<CoinItemsResponse> => {
  return await api.get('api/coins/items').json();
};
