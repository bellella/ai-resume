import type React from 'react';
import { cn } from '@/lib/utils';

interface ActionButtonsProps {
  children: React.ReactNode;
  className?: string;
}

export function ActionButtons({ children, className }: ActionButtonsProps) {
  return <div className={cn('flex flex-wrap items-center gap-2', className)}>{children}</div>;
}
