import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/header';
import { AuthHydration } from '@/components/apps/auth-hydration';
import { Toaster } from '@/components/ui/toaster';
import { AppSidebar } from '@/components/layout/sidebar';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Resume',
  description: 'Create your resume with AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthHydration />
        <Providers>
          <div className="w-full">
            <div className="min-h-screen flex flex-col">
              <AppSidebar />
              <Header />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
