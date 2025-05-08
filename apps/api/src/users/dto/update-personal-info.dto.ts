import { UpdatePersonalInfoRequest } from '@ai-resume/types';
import { IsEmail } from 'class-validator';
import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class UpdatePersonalInfoDto implements UpdatePersonalInfoRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
