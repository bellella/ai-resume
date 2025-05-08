import type React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn('container py-4 lg:py-10 px-4 md:px-6 h-content-min-height', className)}
      {...props}
    >
      {children}
    </div>
  );
}
