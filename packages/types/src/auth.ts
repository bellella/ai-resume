import { UserInfo } from './user';

/**
 * Request for user signup
 */
export interface SignupRequest {
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
 * Request for user login
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Response data returned after successful login
 */
export interface LoginResponse {
  token: string;
}
