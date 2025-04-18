'use client';

import { useMutation } from '@tanstack/react-query';
import { signup, login } from '@/lib/api/auth';
import { fetchUserInfo } from '@/lib/api/user';
import { useAuthStore } from '@/lib/store/auth';
import { useRouter } from 'next/navigation';
import type {
  SignupPayload,
  LoginPayload,
  ApiResponse,
  LoginResponse,
  UserInfo,
} from '@ai-resume/types';

/**
 * Custom hook for signing up a new user
 * - Calls the signup API
 * - Automatically logs in the user
 * - Saves the token
 * - Fetches and stores the user profile
 */
export const useSignup = () => {
  const { setUserInfo } = useAuthStore();
  const router = useRouter();

  const { mutate: signupUser, isPending } = useMutation<void, Error, SignupPayload>({
    mutationFn: async (payload) => {
      // 1. Send signup request
      await signup(payload);

      // 2. Automatically login after successful signup
      const loginPayload: LoginPayload = {
        email: payload.email,
        password: payload.password,
      };
      const loginRes: ApiResponse<LoginResponse> = await login(loginPayload);

      // 3. Store access token
      const token = loginRes.data.token;
      localStorage.setItem('access_token', token);

      // 4. Fetch user profile and store it in Zustand
      const userRes: ApiResponse<UserInfo> = await fetchUserInfo();
      setUserInfo(userRes.data);

      // 5. Redirect to profile page
      router.replace('/profile');
    },
    onError: (err) => {
      console.error('Signup failed:', err);
    },
  });

  return { signup: signupUser, isPending };
};
