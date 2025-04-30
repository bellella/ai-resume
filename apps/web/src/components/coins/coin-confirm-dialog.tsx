'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
          <DialogTitle>Use {price} AI Coin?</DialogTitle>
        </DialogHeader>
        <p>
          This will consume <strong>1 coin</strong> to generate or improve content using AI.
        </p>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
