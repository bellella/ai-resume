import { create } from 'zustand';
import { UserInfo } from '@ai-resume/types';

interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
