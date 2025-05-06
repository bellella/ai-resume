import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateSectionDto } from './dto/generate-section.dto';
import { AiEvaluationData } from '@ai-resume/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * Evaluates a resume using AI for a given resume ID and user ID.
   */
  @Post('evaluation/:resumeId')
  @ApiBearerAuth('access-token')
  async evaluateResume(
    @Param('resumeId') resumeId: string,
    @User('id') userId: string
  ): Promise<AiEvaluationData> {
    return this.aiService.evaluateResumeWithAi(resumeId, userId);
  }

  /**
   * Composes a summary section for a resume using AI, based on the provided data.
   */
  @Post('summary')
  async composeSummary(@Body() dto: GenerateSectionDto, @User('id') userId: string) {
    return this.aiService.composeSectionWithAi('summary', userId, dto.resumeId, dto.text, dto.meta);
  }

  /**
   * Composes an experience section for a resume using AI, based on the provided data.
   */
  @Post('experience')
  async composeExperience(@Body() dto: GenerateSectionDto, @User('id') userId: string) {
    return this.aiService.composeSectionWithAi(
      'experience',
      userId,
      dto.resumeId,
      dto.text,
      dto.meta
    );
  }
}
