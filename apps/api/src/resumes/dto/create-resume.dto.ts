import { IsObject, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ResumeJson, CreateResumeRequest, TemplateJson } from '@ai-resume/types';

export class CreateResumeDto implements CreateResumeRequest {
  @IsString()
  title: string;

  @IsString()
  templateId: string;

  @IsObject()
  resumeJson: ResumeJson;

  @IsObject()
  templateJson: TemplateJson;

  @IsString()
  thubmnailImage?: string;
}
