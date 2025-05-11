'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import LoginForm from '@/components/forms/login-form';
import SignupForm from '@/components/forms/signup-form';
import { CheckCircle } from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    onOpenChange(false);
  };

  const handleSignup = () => {
    setMode('login');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-4 content-center rounded-none w-full md:rounded-lg md:max-w-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{mode === 'login' ? 'Login' : 'Sign Up'}</DialogTitle>
          <DialogDescription>
            Unlock the full experience by logging in:
            <ul className="space-y-2 mt-2 font-bold">
              <li className="flex items-center justify-center gap-2">
                {' '}
                <CheckCircle className="w-4 h-4 text-green-500" /> <span>Save your resumes</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                {' '}
                <CheckCircle className="w-4 h-4 text-green-500" />{' '}
                <span>Convert resumes to PDF</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                {' '}
                <CheckCircle className="w-4 h-4 text-green-500" />{' '}
                <span>Use AI for enhancement</span>
              </li>
              <li className="flex items-center justify-center gap-2">
                {' '}
                <CheckCircle className="w-4 h-4 text-green-500" />{' '}
                <span>Perform AI evaluation</span>
              </li>
            </ul>
          </DialogDescription>
        </DialogHeader>

        {mode === 'login' ? (
          <LoginForm onLogin={handleLogin} onSignupLinkClick={() => setMode('signup')} />
        ) : (
          <SignupForm onSignup={handleSignup} onLoginLinkClick={() => setMode('login')} />
        )}
      </DialogContent>
    </Dialog>
  );
}
