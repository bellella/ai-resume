'use client';

import { login } from '@/lib/api/auth.api';
import { fetchUser } from '@/lib/api/user.api';
import { useAuthStore } from '@/lib/store/auth.store';
import type { LoginRequest, LoginResponse } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { setUserInfo } = useAuthStore();

  const { mutateAsync: loginUser, isPending } = useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
    onSuccess: async (res) => {
      const token = res.token;
      if (token) {
        localStorage.setItem('access_token', token);

        try {
          const userRes = await fetchUser();
          setUserInfo(userRes);
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
