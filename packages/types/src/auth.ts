/**
 * Payload for user signup
 */
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * Payload for user login
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Response data returned after successful login
 */
export interface LoginResponse {
  token: string;
}