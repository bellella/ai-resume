import { Prisma } from '@ai-resume/db';

export type UserInput = Pick<Prisma.UserCreateInput, 'email' | 'name'>;

export type UserInfo = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    imageUrl: true;
    defaultResumeJson: true;
  };
}>;

export interface PersonalInfo {
  name: string;
  email: string;
}
