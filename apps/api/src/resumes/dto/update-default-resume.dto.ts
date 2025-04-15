import { ResumeJson } from '@ai-resume/types';
import { IsObject, IsNotEmpty, IsJSON } from 'class-validator';

export class UpdateDefaultResumeDto {
  @IsObject()
  @IsNotEmpty()
  defaultResumeJson: ResumeJson;
}
