import { Prisma } from '@ai-resume/db';

/**
 * Input structure for creating a user
 * */
export type UserInput = Pick<Prisma.UserCreateInput, 'email' | 'name'>;

/**
 * Represents user information with selected fields
 * */
export type UserInfo = Prisma.UserGetPayload<{
  select: {
    id: true;
    email: true;
    name: true;
    imageUrl: true;
    defaultResumeJson: true;
    coins: true;
  };
}>;

/**
 * Structure for personal information
 * */
export interface PersonalInfo {
  name: string;
  email: string;
}
