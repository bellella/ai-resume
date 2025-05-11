'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Coins } from 'lucide-react';
interface Props {
  open: boolean;
  price: number;
  onConfirm: () => void;
  onCancel: () => void;
  message?: React.ReactNode;
}

export function CoinConfirmDialog({ open, price, onConfirm, onCancel, message }: Props) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Use {price} Coin?</DialogTitle>
        </DialogHeader>
        {message}
        <DialogFooter>
          <Button variant="accent" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Confirm
            <Coins className="w-4 h-4 text-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
