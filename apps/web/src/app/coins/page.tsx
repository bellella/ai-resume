'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Coins,
  Download,
  Share,
  Sparkles,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { SectionHeader } from '@/components/ui/section-header';
import { PurchaseModal } from '@/components/coins/purchase-modal';

export default function CoinsPage() {
  const [selectedPlan, setSelectedPlan] = useState<{ amount: number; price: number } | null>(null);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const handlePurchase = (plan: { amount: number; price: number }) => {
    setSelectedPlan(plan);
    setIsPurchaseModalOpen(true);
  };

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <PageHeader title="Coins" description="Manage your coins and purchase history." />

        {/* Coin Summary Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Balance</CardTitle>
              <CardDescription>Your available coins</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Coins className="h-8 w-8 text-primary" />
                <span className="text-4xl font-bold">125</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => setIsPurchaseModalOpen(true)}>
                Buy More Coins
              </Button>
            </CardFooter>
          </Card>

          <Card className="dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Usage</CardTitle>
              <CardDescription>How you've used your coins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span>PDF Exports</span>
                <Badge variant="secondary">45</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>AI Enhancements</span>
                <Badge variant="secondary">30</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Premium Templates</span>
                <Badge variant="secondary">20</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Common coin operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full gap-1">
                <Download className="h-4 w-4" />
                Export Resume (5 coins)
              </Button>
              <Button variant="outline" className="w-full gap-1">
                <Share className="h-4 w-4" />
                Share Resume (Free)
              </Button>
              <Button variant="outline" className="w-full gap-1">
                <Sparkles className="h-4 w-4" />
                AI Enhancement (10 coins)
              </Button>
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
            {[
              { amount: 100, price: 4.99, popular: false },
              { amount: 250, price: 9.99, popular: true },
              { amount: 500, price: 17.99, popular: false },
            ].map((plan) => (
              <Card
                key={plan.amount}
                className={`${plan.popular ? 'border-primary' : ''} dark:border-gray-700`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5 text-primary" />
                    {plan.amount} Coins
                  </CardTitle>
                  <CardDescription>
                    {plan.popular && 'Best value! '}
                    Use for exports and AI features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${plan.price}</div>
                  <p className="text-sm text-muted-foreground mt-1">One-time purchase</p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">PDF exports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">AI enhancements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span className="text-sm">Premium templates</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => handlePurchase(plan)}
                  >
                    Purchase
                  </Button>
                </CardFooter>
              </Card>
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
              <div className="space-y-4">
                {[
                  { type: 'purchase', amount: 250, date: '2023-04-01', status: 'completed' },
                  {
                    type: 'usage',
                    amount: -5,
                    date: '2023-04-05',
                    status: 'completed',
                    description: 'PDF Export',
                  },
                  {
                    type: 'usage',
                    amount: -10,
                    date: '2023-04-10',
                    status: 'completed',
                    description: 'AI Enhancement',
                  },
                  { type: 'purchase', amount: 100, date: '2023-03-15', status: 'completed' },
                  {
                    type: 'usage',
                    amount: -20,
                    date: '2023-03-20',
                    status: 'completed',
                    description: 'Premium Template',
                  },
                ].map((transaction, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      {transaction.type === 'purchase' ? (
                        <div className="bg-primary/10 p-2 rounded-full">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                      ) : (
                        <div className="bg-muted p-2 rounded-full">
                          <Coins className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {transaction.type === 'purchase'
                            ? 'Coin Purchase'
                            : transaction.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-medium ${transaction.amount > 0 ? 'text-green-600 dark:text-green-500' : ''}`}
                      >
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount} coins
                      </span>
                      {transaction.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </Container>
  );
}
