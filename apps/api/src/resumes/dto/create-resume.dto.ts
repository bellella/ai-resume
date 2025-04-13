import { ResumeJson, ResumeInput } from '@ai-resume/types';
import { IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class CreateResumeDto implements ResumeInput {
  @IsObject()
  @IsOptional()
  ai?: {
    content: boolean;
    grammar: boolean;
  };

  @IsObject()
  @IsNotEmpty()
  resumeJson: ResumeJson;
}
