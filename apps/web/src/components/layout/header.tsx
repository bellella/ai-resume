'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLogout } from '@/lib/hooks/use-logout';
import { useAuthStore } from '@/lib/store/auth';
import { cn } from '@/lib/utils';
import { Coins, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarTrigger } from '../ui/sidebar';
export default function Header() {
  const pathname = usePathname();
  const { logout } = useLogout();
  const { user } = useAuthStore();

  return (
    <header className="bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="hidden md:flex items-center gap-2 text-primary">
          <Sparkles className="h-6 w-6" />
          <span className="text-xl font-bold">AI Resume</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname.startsWith('/home') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Home
          </Link>
          <Link
            href="/resumes"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname.startsWith('/resumes') ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            My Resumes
          </Link>
          <Link
            href="/coins"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname === '/coins' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            Coins
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* <ModeToggle /> */}

          {user ? (
            <>
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Profile</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Link href="/coins">
                <Button variant="ghost" size="icon">
                  <Coins className="h-5 w-5" />
                  <span className="sr-only">Coins</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
