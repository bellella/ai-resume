import { Prisma } from '@ai-resume/db';
import {
  FetchResumeResponse,
  FetchResumesResponse,
  ResumeJson,
  TemplateJson,
  UpdateDefaultResumeResponse,
  UpdateResumeResponse,
} from '@ai-resume/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';

@Injectable()
export class ResumeService {
  constructor(private readonly prisma: PrismaService) {}

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
  async findOne(resumeId: string): Promise<FetchResumeResponse> {
    const result = await this.prisma.resume.findUnique({
      where: { id: resumeId },
      include: {
        aiEvaluations: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!result) {
      throw new NotFoundException('Resume not found');
    }

    const aiEvaluation = result?.aiEvaluations?.[0]
      ? {
          score: result.aiEvaluations[0].score,
          summary: result.aiEvaluations[0].summary,
          strengths: result.aiEvaluations[0].strengths,
          weaknesses: result.aiEvaluations[0].weaknesses,
          lastUpdated: result.aiEvaluations[0].createdAt,
        }
      : undefined;

    const { id, title, createdAt, updatedAt, templateId, resumeJson, templateJson } = result;
    return {
      id,
      title,
      createdAt,
      updatedAt,
      templateId,
      resumeJson: resumeJson as ResumeJson,
      templateJson: templateJson as TemplateJson,
      aiEvaluation,
    };
  }

  /**
   * Updates a specific resume by ID
   */
  async update(id: string, updateResumeDto: UpdateResumeDto): Promise<UpdateResumeResponse> {
    return this.prisma.resume.update({
      where: { id },
      data: updateResumeDto,
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
   * Duplicates a specific resume
   */
  duplicate(id: string) {
    return `This action duplicates resume #${id}`;
  }

  /**
   * Updates the default resume for a user
   */
  async updateDefaultResume(
    resumeJson: ResumeJson,
    userId: string
  ): Promise<UpdateDefaultResumeResponse> {
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
  async findAllByUserId(userId: string): Promise<FetchResumesResponse> {
    return this.prisma.resume.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        templateId: true,
        thubmnailImage: true,
      },
    });
  }
}
