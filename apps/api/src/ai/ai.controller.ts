import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AiService } from './ai.service';
import { GenerateSectionDto } from './dto/generate-section.dto';
import { AiEvaluationData } from '@ai-resume/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CurrentUser } from 'src/types/user';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('evaluation/:resumeId')
  @ApiBearerAuth('access-token')
  async evaluateResume(
    @Param('resumeId') resumeId: string,
    @User('id') userId: string
  ): Promise<AiEvaluationData> {
    return this.aiService.evaluateResumeWithAi(resumeId, userId);
  }

  @Post('summary')
  async composeSummary(@Body() dto: GenerateSectionDto, @User('id') userId: string) {
    return this.aiService.composeSectionWithAi('summary', userId, dto.resumeId, dto.text, dto.meta);
  }

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
