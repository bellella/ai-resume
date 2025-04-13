'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { FormField } from '@/components/ui/form-field';
import { Coins, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import { useTheme } from 'next-themes';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: { amount: number; price: number } | null;
}

export function PurchaseModal({
  isOpen,
  onClose,
  selectedPlan: initialSelectedPlan,
}: PurchaseModalProps) {
  const [step, setStep] = useState<'plan' | 'payment' | 'success'>('plan');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ amount: number; price: number } | null>(
    initialSelectedPlan || null
  );
  const { theme } = useTheme();

  // Update selected plan when initialSelectedPlan changes
  useEffect(() => {
    if (initialSelectedPlan) {
      setSelectedPlan(initialSelectedPlan);
    }
  }, [initialSelectedPlan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  const resetAndClose = () => {
    setStep('plan');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 'plan' && (
          <>
            <DialogHeader>
              <DialogTitle>Purchase Coins</DialogTitle>
              <DialogDescription>Select a coin package to purchase</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { amount: 100, price: 4.99 },
                  { amount: 250, price: 9.99 },
                  { amount: 500, price: 17.99 },
                ].map((plan) => (
                  <div
                    key={plan.amount}
                    className={`border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors ${
                      selectedPlan?.amount === plan.amount
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'dark:border-gray-700'
                    }`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex justify-center mb-2">
                      <Coins className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-bold text-lg">{plan.amount}</div>
                    <div className="text-sm text-muted-foreground">${plan.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                onClick={() => setStep('payment')}
                disabled={!selectedPlan}
                className="w-full"
              >
                Continue to Payment
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <button onClick={() => setStep('plan')} className="p-1 rounded-full hover:bg-muted">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                Payment Information
              </DialogTitle>
              <DialogDescription>
                {selectedPlan && (
                  <div className="mt-2 p-2 bg-muted rounded-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-5 w-5 text-primary" />
                      <span>{selectedPlan.amount} Coins</span>
                    </div>
                    <span className="font-medium">${selectedPlan.price}</span>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <FormField id="card-number" label="Card Number">
                  <div className="flex items-center border rounded-md px-3 py-2 dark:border-gray-700">
                    <CreditCard className="h-4 w-4 text-muted-foreground mr-2" />
                    <Input
                      id="card-number"
                      placeholder="4242 4242 4242 4242"
                      className="border-0 p-0 focus-visible:ring-0 bg-transparent"
                    />
                  </div>
                </FormField>

                <div className="grid grid-cols-2 gap-4">
                  <FormField id="expiry" label="Expiry Date">
                    <Input id="expiry" placeholder="MM/YY" />
                  </FormField>
                  <FormField id="cvc" label="CVC">
                    <Input id="cvc" placeholder="123" />
                  </FormField>
                </div>

                <FormField id="name" label="Name on Card">
                  <Input id="name" placeholder="John Doe" />
                </FormField>
              </div>

              <DialogFooter>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Complete Purchase'}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 'success' && (
          <>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div
                className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 ${
                  theme === 'dark' ? 'bg-green-900/20' : 'bg-green-100'
                }`}
              >
                <CheckCircle
                  className={`h-8 w-8 ${theme === 'dark' ? 'text-green-500' : 'text-green-600'}`}
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">Purchase Successful!</h2>
              <p className="text-muted-foreground mb-6">
                {selectedPlan?.amount} coins have been added to your account.
              </p>
              <Button onClick={resetAndClose}>Return to Coins Page</Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
