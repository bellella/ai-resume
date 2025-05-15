import { ResumeJson, UpdateDefaultResumeRequest } from '@ai-resume/types';
import { IsNotEmpty, IsObject } from 'class-validator';

export class UpdateDefaultResumeDto implements UpdateDefaultResumeRequest {
  @IsObject()
  @IsNotEmpty()
  defaultResumeJson: ResumeJson;
}
