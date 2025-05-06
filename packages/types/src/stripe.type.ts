/**
 * Response for creating a checkout session
 */
export type CreateCheckoutSessionResponse = {
  url: string;
};

/**
 * Payload for creating a checkout session
 */
export type CreateCheckoutSessionRequest = {
  priceId: string;
  coinItemId: string;
};
