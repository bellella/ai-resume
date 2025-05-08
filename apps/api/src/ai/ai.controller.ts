import { AiEvaluationResponse, EnhanceContentResponse } from '@ai-resume/types';
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AiService } from './ai.service';
import { EnhanceSummaryRequestDto } from './dto/enhance-summary-request.dto';
import { EnhanceWorkExperienceRequestDto } from './dto/enhance-work-experience-request.dto';

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
  ): Promise<AiEvaluationResponse> {
    return this.aiService.evaluateResumeWithAi(resumeId, userId);
  }

  /**
   * Composes a summary section for a resume using AI, based on the provided data.
   */
  @Post('summary')
  async enhanceSummary(
    @Body() dto: EnhanceSummaryRequestDto,
    @User('id') userId: string
  ): Promise<EnhanceContentResponse> {
    return this.aiService.enhanceSummaryWithAi(userId, dto);
  }

  /**
   * Composes an experience section for a resume using AI, based on the provided data.
   */
  @Post('work-experience')
  async enhanceWorkExperience(
    @Body() dto: EnhanceWorkExperienceRequestDto,
    @User('id') userId: string
  ): Promise<EnhanceContentResponse> {
    return this.aiService.enhanceWorkExperienceWithAi(userId, dto);
  }
}
