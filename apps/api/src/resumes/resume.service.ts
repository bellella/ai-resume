import { Prisma } from '@ai-resume/db';
import { ResumeJson } from '@ai-resume/types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TemplatesService } from '../templates/templates.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(
    private readonly templateService: TemplatesService,
    private readonly prisma: PrismaService
  ) {}

  async create(
    createResumeDto: CreateResumeDto,
    userId: string
  ): Promise<Prisma.ResumeGetPayload<{}>> {
    // check if ai is enabled
    if (createResumeDto.ai?.content) {
      // TODO: Implement AI resume creation
    }
    if (createResumeDto.ai?.grammar) {
      // TODO: Implement AI resume grammar check
    }

    let template;
    if (createResumeDto.templateId) {
      template = await this.prisma.template.findUnique({
        where: { id: createResumeDto.templateId },
      });
      if (!template) {
        throw new Error('Template not found');
      }
    }

    // bind template to resume
    const resumeHtml = this.templateService.bindDataToTemplate(
      template.html,
      createResumeDto.resumeJson as unknown as Record<string, unknown>
    );
    console.log('sucess');

    // save resume to DB
    const resume = await this.prisma.resume.create({
      data: {
        title: createResumeDto.title,
        resumeHtml: resumeHtml,
        resumeJson: createResumeDto.resumeJson,
        user: {
          connect: {
            id: userId,
          },
        },
        ...(createResumeDto.templateId
          ? {
              template: {
                connect: {
                  id: createResumeDto.templateId,
                },
              },
            }
          : {}),
      },
    });

    return resume;
  }

  async findAll() {
    return this.prisma.resume.findMany();
  }

  async findOne(id: string) {
    return this.prisma.resume.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateResumeDto: UpdateResumeDto) {
    return this.prisma.resume.update({
      where: { id },
      data: {
        resumeJson: updateResumeDto.resumeJson,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.resume.delete({
      where: { id },
    });
  }

  generatePdf(id: string) {
    // TODO: Implement PDF generation using Puppeteer
    return `This action generates PDF for resume #${id}`;
  }

  duplicate(id: string) {
    // TODO: Implement resume duplication
    return `This action duplicates resume #${id}`;
  }

  async updateDefaultResume(resumeJson: ResumeJson, userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        defaultResumeJson: resumeJson,
      },
    });
  }

  async findAllByUserId(userId: string) {
    return this.prisma.resume.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
