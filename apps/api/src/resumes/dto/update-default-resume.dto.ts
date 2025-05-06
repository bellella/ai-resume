import { ResumeJson, UpdateDefaultResumeRequest } from '@ai-resume/types';
import { IsObject, IsNotEmpty, IsJSON } from 'class-validator';

export class UpdateDefaultResumeDto implements UpdateDefaultResumeRequest {
  @IsObject()
  @IsNotEmpty()
  defaultResumeJson: ResumeJson;
}
