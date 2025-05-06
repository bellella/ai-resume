'use client';

import { login } from '@/lib/api/auth';
import { fetchUserInfo } from '@/lib/api/user';
import { useAuthStore } from '@/lib/store/auth';
import type { LoginPayload, LoginResponse } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const { setUserInfo } = useAuthStore();

  const { mutateAsync: loginUser, isPending } = useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: async (res) => {
      const token = res.token;
      if (token) {
        localStorage.setItem('access_token', token);

        try {
          const userRes = await fetchUserInfo();
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
