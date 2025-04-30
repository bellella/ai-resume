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
    // save resume to DB
    const resume = await this.prisma.resume.create({
      data: {
        title: createResumeDto.title,
        resumeJson: createResumeDto.resumeJson,
        templateJson: createResumeDto.templateJson,
        user: {
          connect: {
            id: userId,
          },
        },
        templateId: createResumeDto.templateId,
      },
    });

    return resume;
  }

  async findAll() {
    return this.prisma.resume.findMany();
  }

  async findOne(id: string) {
    const result = await this.prisma.resume.findUnique({
      where: { id },
      include: {
        aiEvaluations: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const aiEvaluation = result?.aiEvaluations?.[0]
      ? {
          score: result.aiEvaluations[0].score,
          summary: result.aiEvaluations[0].summary,
          strengths: result.aiEvaluations[0].strengths,
          weaknesses: result.aiEvaluations[0].weaknesses,
          lastUpdated: result.aiEvaluations[0].createdAt,
        }
      : null;

    return {
      ...result,
      aiEvaluation,
    };
  }

  async update(id: string, updateResumeDto: UpdateResumeDto) {
    return this.prisma.resume.update({
      where: { id },
      data: {
        title: updateResumeDto.title,
        templateId: updateResumeDto.templateId,
        resumeJson: updateResumeDto.resumeJson,
        templateJson: updateResumeDto.templateJson,
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
