'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/lib/hooks/use-login';
import { useAuthStore } from '@/lib/store/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Please enter your password'),
});

type FormValues = z.infer<typeof formSchema>;

type LoginFormProps = {
  onLogin?: () => void;
  onSignupLinkClick?: () => void;
};
export default function LoginForm({ onLogin, onSignupLinkClick }: LoginFormProps) {
  const { login, isPending } = useLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: FormValues) => {
    try {
      await login(data);
      onLogin?.();
    } catch (err) {
      toast.error('Login failed. Check your email and password.');
    }
  };

  const handleSignupLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onSignupLinkClick) {
      e.preventDefault();
      onSignupLinkClick();
    }
  };
  return (
    <Card>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Email input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {/* <Link
                    href="/forgot-password"
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link> */}
            </div>
            <Input id="password" type="password" {...form.register('password')} />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          {/* Submit button */}
          <Button className="w-full mt-6" type="submit" disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <span className="relative bg-card px-2 text-muted-foreground text-sm">or</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div> */}
      </CardContent>

      {/* Footer: signup redirect */}
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          Don’t have an account?
          <Link
            href="/signup"
            className="ml-1 text-primary underline-offset-4 hover:underline"
            onClick={handleSignupLinkClick}
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
