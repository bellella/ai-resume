import { EnahanceWorkExperienceRequest, WorkExperienceMeta } from '@ai-resume/types';
import { IsObject, IsOptional, IsString } from 'class-validator';
export class EnhanceWorkExperienceRequestDto implements EnahanceWorkExperienceRequest {
  @IsString()
  @IsOptional()
  userInput?: string;

  @IsString()
  resumeId: string;

  @IsObject()
  meta: WorkExperienceMeta;
}
