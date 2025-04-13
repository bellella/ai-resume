import type React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  id: string;
  label: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

export function FormField({ id, label, children, description, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
