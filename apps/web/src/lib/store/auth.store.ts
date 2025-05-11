'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ResumeJson, UserInfo } from '@ai-resume/types';
import { fetchUser } from '../api/user.api';

interface AuthState {
  user: UserInfo | null;
  defaultResumeJson?: ResumeJson;
  isLoading: boolean;
  setUserInfo: (user: UserInfo | null) => void;
  setDefaultResumeJson: (defaultResumeJson: ResumeJson) => void;
  clearUserInfo: () => void;
  hydrateUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      defaultResumeJson: undefined,
      isLoading: true,
      setUserInfo: (user) => {
        set({ user, isLoading: false });
        set({ defaultResumeJson: user?.defaultResumeJson });
      },
      clearUserInfo: () => set({ user: null, isLoading: false }),
      hydrateUser: async () => {
        try {
          const res = await fetchUser();
          get().setUserInfo(res);
        } catch (error) {
          get().setUserInfo(null);
        } finally {
          set({ isLoading: false });
        }
      },
      setDefaultResumeJson: (defaultResumeJson: ResumeJson) => set({ defaultResumeJson }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
