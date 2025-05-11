import { AiEvaluationResponse, ResumeJson } from '@ai-resume/types';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { PRICING } from 'src/lib/constants/pricing';
import { resumePrompts } from 'src/lib/resume-prompts';
import { CoinService } from '../coins/coin.service';
import { PrismaService } from '../prisma/prisma.service';
import { EnhanceSummaryRequestDto } from './dto/enhance-summary-request.dto';
import { EnhanceWorkExperienceRequestDto } from './dto/enhance-work-experience-request.dto';

@Injectable()
export class AiService {
  private readonly openai: OpenAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  constructor(
    private readonly prisma: PrismaService,
    private readonly coinService: CoinService
  ) {}

  /**
   * Retrieves the latest AI evaluation for a resume
   */
  async getEvaluation(resumeId: string) {
    return this.prisma.aiEvaluation.findFirst({
      where: { resumeId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Evaluates a resume using AI and deducts coins from the user
   */
  async evaluateResumeWithAi(resumeId: string, userId: string): Promise<AiEvaluationResponse> {
    const price = PRICING.EVALUATE_RESUME;
    return this.prisma.$transaction(
      async (tx) => {
        await this.coinService.deductCoins(tx, userId, price);

        const resume = await tx.resume.findUnique({ where: { id: resumeId } });
        const prompt = resumePrompts.evaluateResume(resume?.resumeJson as ResumeJson);
        // get json string data from openai and parse it
        const raw = await this.requestResumeAIResponse(prompt);
        const parsed = this.parseResponse(raw);

        const evaluation = await tx.aiEvaluation.create({
          data: {
            resumeId,
            score: parsed.score,
            summary: parsed.summary,
            strengths: parsed.strengths,
            weaknesses: parsed.weaknesses,
          },
        });

        await tx.transaction.create({
          data: {
            userId,
            type: 'USAGE',
            price,
            name: 'Evaluate resume',
            meta: {
              resumeId,
            },
          },
        });
        console.log('evaluation', evaluation);

        return {
          score: evaluation.score,
          summary: evaluation.summary,
          strengths: evaluation.strengths,
          weaknesses: evaluation.weaknesses,
          lastUpdated: evaluation.createdAt,
        };
      },
      { timeout: 8000 }
    );
  }

  /**
   * Parses the AI response into a structured format
   */
  private parseResponse(responseText: string): {
    score: number;
    summary: string;
    strengths: string[];
    weaknesses: string[];
  } {
    try {
      const start = responseText.indexOf('{');
      const end = responseText.lastIndexOf('}');

      if (start === -1 || end === -1 || end <= start) {
        throw new Error('No valid JSON boundaries found.');
      }

      const jsonText = responseText.slice(start, end + 1);
      const parsed = JSON.parse(jsonText);

      if (
        typeof parsed.score === 'number' &&
        typeof parsed.summary === 'string' &&
        Array.isArray(parsed.strengths) &&
        Array.isArray(parsed.weaknesses)
      ) {
        return parsed;
      }

      throw new Error('JSON structure is invalid.');
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      throw new Error('AI response parsing failed.');
    }
  }

  /**
   * Enhances a summary section using AI
   */
  async enhanceSummaryWithAi(userId: string, dto: EnhanceSummaryRequestDto) {
    const price = PRICING.ENHANCE_SUMMARY;
    return await this.prisma.$transaction(async (tx) => {
      await this.coinService.deductCoins(tx, userId, price);
      const prompt = resumePrompts.summary({
        userInput: dto.userInput,
        meta: dto.meta,
      });
      const result = await this.requestResumeAIResponse(prompt);
      await tx.transaction.create({
        data: {
          userId,
          type: 'USAGE',
          price,
          name: `Enhance Summary`,
          meta: {
            resumeId: dto.resumeId,
          },
        },
      });

      return { result };
    });
  }

  /**
   * Enhances a work experience section using AI
   */
  async enhanceWorkExperienceWithAi(userId: string, dto: EnhanceWorkExperienceRequestDto) {
    const price = PRICING.ENHANCE_WORK_EXPERIENCE;
    return await this.prisma.$transaction(async (tx) => {
      await this.coinService.deductCoins(tx, userId, price);
      const prompt = resumePrompts.workExperience({
        userInput: dto.userInput,
        meta: dto.meta,
      });
      const result = await this.requestResumeAIResponse(prompt);
      await tx.transaction.create({
        data: {
          userId,
          type: 'USAGE',
          price,
          name: `Enhance Work Experience`,
          meta: {
            resumeId: dto.resumeId,
          },
        },
      });

      return { result };
    });
  }

  /**
   * Sends a prompt to the AI chat model and returns the response
   */
  async requestResumeAIResponse(prompt: string) {
    const res = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful resume reviewer.' },
        { role: 'user', content: prompt },
      ],
    });
    return res.choices[0].message.content ?? '';
  }
}
