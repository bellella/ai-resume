import { User } from '@ai-resume/db';

export type SignupDto = Pick<User, 'email' | 'password' | 'name'>; 