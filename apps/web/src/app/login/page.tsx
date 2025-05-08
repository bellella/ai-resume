'use client';

import LoginForm from '@/components/forms/login-form';
import { useAuthStore } from '@/lib/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  const handleLogin = () => {
    toast.success('Login successful');
    router.push('/profile');
  };
  return (
    <div className="page h-min-content flex items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
