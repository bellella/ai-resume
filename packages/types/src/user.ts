import { Prisma } from '@ai-resume/db';

export type UserInput = Pick<Prisma.UserCreateInput, 'email' | 'name' >;

export type UserResponse = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    image: true;
    createdAt: true;
    defaultResumeJson: true;
  };
}>;

export interface PersonalInfo {
  firstName: string | '';
  lastName: string | '';
  email: string | '';
  phone: string | '';
  title: string | '';
  location: string | '';
}