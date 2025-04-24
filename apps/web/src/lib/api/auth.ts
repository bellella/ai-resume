import { api } from './ky';
import { LoginResponse, SignupResponse } from '@ai-resume/types';

/**
 * Sign up with name, email, and password
 */
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<SignupResponse> => {
  return await api
    .post('api/auth/signup', {
      json: data,
    })
    .json();
};

/**
 * Log in with email and password
 */
export const login = async (data: { email: string; password: string }): Promise<LoginResponse> => {
  return await api
    .post('api/auth/login', {
      json: data,
    })
    .json();
};
