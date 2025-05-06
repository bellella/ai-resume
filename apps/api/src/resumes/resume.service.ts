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

  /**
   * Creates a new resume
   */
  async create(
    createResumeDto: CreateResumeDto,
    userId: string
  ): Promise<Prisma.ResumeGetPayload<{}>> {
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

  /**
   * Retrieves all resumes
   */
  async findAll() {
    return this.prisma.resume.findMany();
  }

  /**
   * Retrieves a specific resume by ID
   */
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

  /**
   * Updates a specific resume by ID
   */
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

  /**
   * Removes a specific resume by ID
   */
  async remove(id: string) {
    return this.prisma.resume.delete({
      where: { id },
    });
  }

  /**
   * Generates a PDF for a specific resume
   */
  generatePdf(id: string) {
    return `This action generates PDF for resume #${id}`;
  }

  /**
   * Duplicates a specific resume
   */
  duplicate(id: string) {
    return `This action duplicates resume #${id}`;
  }

  /**
   * Updates the default resume for a user
   */
  async updateDefaultResume(resumeJson: ResumeJson, userId: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        defaultResumeJson: resumeJson,
      },
    });
  }

  /**
   * Retrieves all resumes for a specific user
   */
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
