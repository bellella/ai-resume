import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TemplateLevel } from '@ai-resume/types';

export class CreateTemplateDto {
  @IsString()
  name: string;

  @IsString()
  html: string;

  @IsEnum(TemplateLevel)
  level: TemplateLevel;

  @IsString()
  @IsOptional()
  previewImageUrl?: string;
} 