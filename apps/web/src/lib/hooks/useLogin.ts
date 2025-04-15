'use client';

import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api/auth';
import { fetchUserInfo } from '@/lib/api/user';
import { useAuthStore } from '@/lib/store/auth';
import type { LoginPayload, UserInfo, ApiResponse, LoginResponse } from '@ai-resume/types';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { setUserInfo } = useAuthStore();
  const router = useRouter();

  const { mutate: loginUser, isPending } = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: async (res) => {
      const token = res.token;
      if (token) {
        // 1. Store token (ex: localStorage)
        localStorage.setItem('access_token', token);

        try {
          // 2. Fetch user profile
          const userRes: ApiResponse<UserInfo> = await fetchUserInfo();
          setUserInfo(userRes.data);

          // 3. Redirect
          router.replace('/profile');
        } catch (err) {
          console.error('Failed to fetch user profile:', err);
        }
      }
    },
    onError: (err) => {
      console.error('Login failed:', err);
    },
  });

  return { login: loginUser, isPending };
};
