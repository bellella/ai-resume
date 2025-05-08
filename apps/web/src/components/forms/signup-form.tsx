'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignup } from '@/lib/hooks/use-signup';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const formSchema = z
  .object({
    name: z.string().min(1, 'Please enter your name'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

type SignupFormProps = {
  onSignup?: () => void;
  onLoginLinkClick?: () => void;
};
export default function SignupForm({ onSignup, onLoginLinkClick }: SignupFormProps) {
  const { signup, isPending } = useSignup();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      await signup({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      onSignup?.();
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error('Signup failed. Please try again.');
    }
  }

  const handleLoginLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onLoginLinkClick) {
      e.preventDefault();
      onLoginLinkClick();
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name input */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" {...form.register('name')} />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...form.register('password')} />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" {...form.register('confirmPassword')} />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? 'Signing up...' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          Already have an account?
          <Link
            href="/login"
            className="ml-1 text-primary underline-offset-4 hover:underline"
            onClick={handleLoginLinkClick}
          >
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
