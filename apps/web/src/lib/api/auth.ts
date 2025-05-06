import { api } from './ky';
import { LoginRequest, LoginResponse, SignupRequest, SignupResponse } from '@ai-resume/types';

/**
 * Sign up with name, email, and password
 */
export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  return await api
    .post('api/auth/signup', {
      json: data,
    })
    .json();
};

/**
 * Log in with email and password
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return await api
    .post('api/auth/login', {
      json: data,
    })
    .json();
};
