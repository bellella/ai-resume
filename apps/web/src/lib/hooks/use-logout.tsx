'use client';

import { useAuthStore } from '@/lib/store/auth.store';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useLogout = () => {
  const { setUserInfo } = useAuthStore();
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');

    setUserInfo(null);

    router.replace('/login');
  }, [setUserInfo, router]);

  return { logout };
};
