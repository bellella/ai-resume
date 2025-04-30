'use client';

import { CoinCard } from '@/components/coins/coin-card';
import TransactionList from '@/components/coins/transaction-list';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionHeader } from '@/components/ui/section-header';
import { getCoinBalance, getCoinItems, getCoinTransactions } from '@/lib/api/coin';
import { createCheckoutSession } from '@/lib/api/stripe';
import { CoinItem } from '@ai-resume/types';
import { useQuery } from '@tanstack/react-query';
import { Coins } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CoinsPage() {
  const [selectedCoinItem, setSelectedCoinItem] = useState<CoinItem | null>(null);

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['coin-balance'],
    queryFn: getCoinBalance,
  });

  const { data: coinItems = [], isLoading: coinItemsLoading } = useQuery({
    queryKey: ['coin-items'],
    queryFn: getCoinItems,
  });

  const { data: transactionsData, isLoading: transactionsLoading } = useQuery({
    queryKey: ['coin-transactions'],
    queryFn: getCoinTransactions,
  });

  const handlePurchase = async (coinItem: CoinItem) => {
    setSelectedCoinItem(coinItem);
    try {
      // 🟰 createCheckoutSession API 호출
      const res = await createCheckoutSession({
        priceId: coinItem.stripePriceId,
        coinItemId: coinItem.id,
      });

      if (res?.url) {
        window.location.href = res.url;
      } else {
        console.error('No URL returned from Stripe');
      }
    } catch (error) {
      console.error('Failed to create checkout session', error);
      toast.error('Failed to create checkout session');
    }
  };

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <PageHeader title="Coins" description="Manage your coins and purchase history." />

        {/* Coin Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Balance</CardTitle>
              <CardDescription>Your available coins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Coins className="h-8 w-8 text-primary" />
                <span className="text-4xl font-bold">
                  {balanceLoading ? '...' : (balanceData?.coins ?? 0)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Coins Section */}
        <div className="pt-4">
          <SectionHeader
            title="Purchase Coins"
            description="Choose a coin package that suits your needs"
            className="mb-6"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {coinItems.map((coinItem) => (
              <CoinCard key={coinItem.id} coinItem={coinItem} onPurchase={handlePurchase} />
            ))}
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="pt-4">
          <SectionHeader
            title="Transaction History"
            description="Your coin purchases and usage"
            className="mb-6"
          />

          <Card className="dark:border-gray-700">
            <CardContent className="p-6">
              <TransactionList transactions={transactionsLoading ? [] : transactionsData || []} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
}
