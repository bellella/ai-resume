import { Prisma } from '@ai-resume/db';

export type SignupDto = Pick<Prisma.UserCreateInput, 'email' | 'password' | 'name'>; 