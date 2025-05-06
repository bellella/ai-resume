import { Prisma } from '@ai-resume/db';
import { ResumeJson } from './resume.type';

/**
 * Response for fetching a user
 */
export type FetchUserResponse = UserInfo;

/**
 * Response for creating a user
 */
export type CreateUserResponse = {
  id: string;
};

/**
 * Request for updating a user
 */
export type UpdatePersonalInfoRequest = {
  name: string;
  email: string;
};

/**
 * Response for updating a user
 */
export type UpdatePersonalInfoResponse = {
  id: string;
};

/**
 * Response for updating the default resume of a user
 */
export type UpdateDefaultResumeRequest = {
  defaultResumeJson: ResumeJson;
};

/**
 * Response for updating the default resume of a user
 */
export type UpdateDefaultResumeResponse = {
  id: string;
};

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
