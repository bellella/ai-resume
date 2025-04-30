import { api } from './ky';

/**
 * Create Stripe checkout session to purchase coins
 */
export const createCheckoutSession = async (data: {
  priceId: string;
  coinItemId: string;
}): Promise<{ url: string }> => {
  return await api
    .post('api/stripe/checkout-session', {
      json: data,
    })
    .json();
};
