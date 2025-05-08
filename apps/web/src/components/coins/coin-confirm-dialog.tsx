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
}

export function CoinConfirmDialog({ open, price, onConfirm, onCancel }: Props) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Use {price} Coin?</DialogTitle>
        </DialogHeader>
        <p className="text-center">
          This will consume <strong className="text-coin">1 coin</strong> to enhance content using
          AI.
        </p>
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
