import { api } from './ky';
import { CoinBalanceResponse, CoinItem, TransactionItem, UseCoinResponse } from '@ai-resume/types';

/**
 * Get user's coin balance
 */
export const getCoinBalance = async (): Promise<CoinBalanceResponse> => {
  return await api.get('api/coins/balance').json();
};

/**
 * Get user's coin transaction history
 */
export const getCoinTransactions = async (): Promise<TransactionItem[]> => {
  return await api.get('api/coins/transactions').json();
};

/**
 * Use coins for purchasing item (e.g., premium template, AI correction)
 */
export const useCoins = async (data: { purchasableItemId: string }): Promise<UseCoinResponse> => {
  return await api
    .post('api/coins/use', {
      json: data,
    })
    .json();
};

/**
 * Get purchasable coin items
 */
export const getCoinItems = async (): Promise<CoinItem[]> => {
  return await api.get('api/coins/items').json();
};
