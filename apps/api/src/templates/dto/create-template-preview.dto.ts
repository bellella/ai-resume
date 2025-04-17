import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateTemplateDto {
  @IsString()
  title: string;

  @IsUrl()
  thumbnail: string;

  @IsString()
  html: string;

  @IsString()
  @IsOptional()
  description?: string;
}
