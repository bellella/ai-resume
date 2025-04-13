'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FileText, User, Coins } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const isLoggedIn = true; // This would be determined by auth state

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <span className="text-xl font-bold">ResumeAI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/resume"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              pathname.startsWith('/resume') ? 'text-primary' : 'text-muted-foreground'
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
          {/* 다크모드 토글 - ModeToggle 컴포넌트 사용 */}
          <ModeToggle />

          {isLoggedIn ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </Link>
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
