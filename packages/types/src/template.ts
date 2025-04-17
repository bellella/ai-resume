import { Prisma } from '@ai-resume/db';

export enum ItemStatus {
  USER = 'USER',
  ADMIN = 'ADMIN',
  DELETED = 'DELETED',
}

export type Template = Prisma.TemplateGetPayload<{
  select: {
    id: true;
    name: true;
    html: true;
    status: true;
    previewImageUrl: true;
    createdAt: true;
  };
}>;

export type TemplateWithPreviewHtml = Prisma.TemplateGetPayload<{
  select: {
    id: true;
    name: true;
    html: true;
    status: true;
    previewImageUrl: true;
    createdAt: true;
  };
}> & {
  previewHtml: string;
};

export type TemplateInput = Pick<
  Prisma.TemplateCreateInput,
  'name' | 'html' | 'status' | 'previewImageUrl'
>;
