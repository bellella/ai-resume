import { IsObject, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ResumeJson, CreateResumePayload, TemplateJson } from '@ai-resume/types';

export class CreateResumeDto implements CreateResumePayload {
  @IsString()
  title: string;

  @IsString()
  templateId: string;

  @IsObject()
  resumeJson: ResumeJson;

  @IsObject()
  templateJson: TemplateJson;

  @IsBoolean()
  @IsOptional()
  ai?: {
    content: boolean;
    grammar: boolean;
  };
}
