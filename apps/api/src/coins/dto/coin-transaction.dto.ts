import { Prisma } from '@ai-resume/db';

export type CreateCoinTransactionDto = Omit<Prisma.CoinTransactionCreateInput, 'user'>; 