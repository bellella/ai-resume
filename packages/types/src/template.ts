import { Prisma } from '@ai-resume/db';

export enum TemplateLevel {
  USER = 'USER',
  ADMIN = 'ADMIN',
  DELETED = 'DELETED'
}

export type TemplateInput = Pick<Prisma.TemplateCreateInput, 'name' | 'html' | 'level' | 'previewImageUrl'>; 