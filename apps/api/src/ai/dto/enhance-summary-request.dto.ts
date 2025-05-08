import { EnhanceSummaryRequest, SummaryMeta } from '@ai-resume/types';
import { IsObject, IsOptional, IsString } from 'class-validator';
export class EnhanceSummaryRequestDto implements EnhanceSummaryRequest {
  @IsString()
  @IsOptional()
  userInput?: string;

  @IsString()
  @IsOptional()
  resumeId: string;

  @IsObject()
  meta: SummaryMeta;
}
