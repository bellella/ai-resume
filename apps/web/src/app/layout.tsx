import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/layout/header';
import { Toaster } from '@/components/ui/toaster';
import { AuthHydration } from '@/components/app/AuthHydration';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Resume',
  description: 'Create your resume with AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthHydration />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
