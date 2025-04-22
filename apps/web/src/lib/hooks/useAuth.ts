import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/lib/store/user';
import { fetchUserInfo } from '@/lib/api/user';

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const { user, setUser } = useUserStore();
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setState({ isLoading: false, isAuthenticated: false });
      return;
    }

    const fetchUserData = async () => {
      try {
        const userData = await fetchUserInfo();
        const completeUserData = {
          ...userData,
          password: '', // Default or placeholder value
          coinBalance: 0, // Default value
          createdAt: new Date(), // Default value
          updatedAt: new Date(), // Default value
        };
        setUser(completeUserData);
        setState({
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setState({
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    fetchUserData();
  }, [setUser]);

  return {
    ...state,
    user,
  };
}
