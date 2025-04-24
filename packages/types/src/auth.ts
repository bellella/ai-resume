import { UserInfo } from './user';

/**
 * Payload for user signup
 */
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

/**
 * Response data returned after successful signup
 */
export interface SignupResponse {
  token: string;
  user: UserInfo;
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
