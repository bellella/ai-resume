'use client';

import SignupForm from '@/components/auth/signup-form';
import { useAuthStore } from '@/lib/store/auth.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      router.push('/profile');
    }
  }, [user, router]);

  const handleSignup = () => {
    toast.success('Signup successful');
    router.push('/login');
  };

  return (
    <div className="page h-min-content flex items-center justify-center px-4 md:px-6">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-muted-foreground">Create your account</p>
        </div>
        <SignupForm onSignup={handleSignup} />
      </div>
    </div>
  );
}
