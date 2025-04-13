import { Prisma } from '@ai-resume/db';

export type UserInput = Pick<Prisma.UserCreateInput, 'email' | 'name' >;

export type UserResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    image: true;
    createdAt: true;
  };
}>;