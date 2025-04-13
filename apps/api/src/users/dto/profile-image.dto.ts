import { Prisma } from '@ai-resume/db';

export type ProfileImageDto = Omit<Prisma.ProfileImageCreateInput, 'user'>;
