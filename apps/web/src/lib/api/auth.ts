import { api } from './ky';
import { ApiResponse } from '@ai-resume/types';

/**
 * Sign up with name, email, and password
 */
export const signup = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<ApiResponse<null>> => {
  return await api
    .post('auth/signup', {
      json: data,
    })
    .json();
};

/**
 * Log in with email and password
 */
export const login = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse<{ token: string }>> => {
  return await api
    .post('auth/login', {
      json: data,
    })
    .json();
};
