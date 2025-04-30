import { IsObject, IsOptional, IsString } from 'class-validator';

export class GenerateSectionDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsString()
  @IsOptional()
  resumeId?: string;

  @IsObject()
  @IsOptional()
  meta?: Record<string, any>;
}
