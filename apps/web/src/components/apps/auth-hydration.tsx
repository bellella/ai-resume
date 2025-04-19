'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/auth';

export function AuthHydration() {
  const { user, hydrateUser } = useAuthStore();

  useEffect(() => {
    if (!user) {
      hydrateUser();
    }
  }, [user]);

  return null;
}
