import { SignupRequest } from '@ai-resume/types';
import { IsString } from 'class-validator';
import { IsEmail } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class SignupDto implements SignupRequest {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  name: string;
}
