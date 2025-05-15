import { CreateResumeRequest, ResumeJson, TemplateJson } from '@ai-resume/types';
import { IsObject, IsString } from 'class-validator';

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
  thumbnailImage?: string;
}
