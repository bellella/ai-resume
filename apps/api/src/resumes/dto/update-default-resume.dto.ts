import { ResumeJson } from '@ai-resume/types';
import { IsObject, IsNotEmpty } from 'class-validator';

export class UpdateDefaultResumeDto {
  @IsObject()
  @IsNotEmpty()
  defaultResumeJson: ResumeJson;
} 