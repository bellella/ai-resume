import { UserInfo } from './user.type';

/**
 * Request for user signup
 */
export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

/**
 * Response data returned after successful signup
 */
export type SignupResponse = {
  token: string;
  user: UserInfo;
};

/**
 * Request for user login
 */
export type LoginRequest = {
  email: string;
  password: string;
};

/**
 * Response data returned after successful login
 */
export type LoginResponse = {
  token: string;
};
