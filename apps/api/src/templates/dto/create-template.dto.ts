import { ResumeJson } from '@ai-resume/types';
import { IsObject } from 'class-validator';

export class CreateTemplateDto {
  @IsObject()
  resumeJson: ResumeJson;
}
