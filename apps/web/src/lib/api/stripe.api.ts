import { CreateCheckoutSessionRequest } from '@ai-resume/types';
import { CreateCheckoutSessionResponse } from '@ai-resume/types';
import { api } from './ky';

/**
 * Create Stripe checkout session to purchase coins
 */
export const createCheckoutSession = async (
  data: CreateCheckoutSessionRequest
): Promise<CreateCheckoutSessionResponse> => {
  return await api
    .post('api/stripe/checkout-session', {
      json: data,
    })
    .json();
};
