import { Prisma } from '@ai-resume/db';

export type CreateCoinItemDto = Omit<Prisma.CoinItemCreateInput, 'id' | 'createdAt'>;
