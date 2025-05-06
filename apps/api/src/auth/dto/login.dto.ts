import { IsEmail, IsString, MinLength } from 'class-validator';
import { LoginRequest } from '@ai-resume/types';

export class LoginDto implements LoginRequest {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  password: string;
}
