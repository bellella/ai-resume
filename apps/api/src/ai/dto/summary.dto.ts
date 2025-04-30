import { IsString, IsOptional, IsObject } from 'class-validator';

export class SummaryDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsObject()
  meta: Record<string, any>;
}
