import React from 'react';
import { Wallet2, Coins, Clock, CheckCircle2 } from 'lucide-react';
import { TransactionItem } from '@ai-resume/types';

interface TransactionListProps {
  transactions: TransactionItem[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="space-y-4">
      {transactions.map((transaction, i) => (
        <div key={i} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            {transaction.type === 'CHARGE' ? (
              <div className="bg-accent p-2 rounded-full">
                <Coins className="h-4 w-4 text-accent-foreground" />
              </div>
            ) : (
              <div className="bg-secondary p-2 rounded-full">
                <Wallet2 className="h-4 w-4 text-primary" />
              </div>
            )}
            <div>
              {transaction.meta?.resumeId ? (
                <a
                  href={`resumes/${transaction.meta.resumeId}`}
                  className="font-medium text-primary hover:underline"
                >
                  {transaction.name}
                </a>
              ) : (
                <p className="font-medium">{transaction.name}</p>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{new Date(transaction.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-2 ${transaction.type === 'CHARGE' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}
          >
            <span className={`font-medium`}>
              {transaction.type === 'CHARGE' ? '+' : '-'}
              {transaction.price} coins
            </span>
            <CheckCircle2 className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
