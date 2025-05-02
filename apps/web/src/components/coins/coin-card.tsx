// src/components/coins/plan-card.tsx

'use client';

import { Coins, CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CoinItem } from '@ai-resume/types'; // Prisma 기반 타입 쓰기로 했지

interface CoinCardProps {
  coinItem: CoinItem;
  onPurchase: (coinItem: CoinItem) => void;
}

export function CoinCard({ coinItem, onPurchase }: CoinCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2  text-yellow-500">
          <Coins className="h-5 w-5" />
          {coinItem.coins} Coins
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">${(coinItem.price / 100).toFixed(2)}</div>
        <p className="text-sm text-muted-foreground mt-1">One-time purchase</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-sm">AI resume enhancement</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-sm">AI evaluation</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="accent" className="w-full" onClick={() => onPurchase(coinItem)}>
          Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}
