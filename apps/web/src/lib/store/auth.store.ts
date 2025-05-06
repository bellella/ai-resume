'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserInfo } from '@ai-resume/types';
import { fetchUser } from '../api/user.api';

interface AuthState {
  user: UserInfo | null;
  isLoading: boolean;
  setUserInfo: (user: UserInfo | null) => void;
  clearUserInfo: () => void;
  hydrateUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      setUserInfo: (user) => set({ user, isLoading: false }),
      clearUserInfo: () => set({ user: null, isLoading: false }),
      hydrateUser: async () => {
        try {
          const res = await fetchUser();
          set({ user: res });
        } catch (error) {
          set({ user: null });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
