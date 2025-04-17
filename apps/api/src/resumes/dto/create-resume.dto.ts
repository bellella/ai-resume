import { IsObject, IsString, IsBoolean, IsOptional } from 'class-validator';
import { ResumeJson, CreateResumePayload } from '@ai-resume/types';

export class CreateResumeDto implements CreateResumePayload {
  @IsString()
  title: string;

  @IsObject()
  resumeJson: ResumeJson;

  @IsString()
  @IsOptional()
  templateId?: string;

  @IsBoolean()
  @IsOptional()
  ai?: {
    content: boolean;
    grammar: boolean;
  };
}
