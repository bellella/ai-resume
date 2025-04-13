import { Prisma } from '@ai-resume/db';

export type UpdateUserDto = Partial<Prisma.UserUpdateInput>;
