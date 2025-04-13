import { Prisma } from '@ai-resume/db';

export type CreateCoinPackageDto = Omit<Prisma.CoinPackageCreateInput, 'id' | 'createdAt'>;
