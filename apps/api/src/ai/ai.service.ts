import { AiEvaluationResponse } from '@ai-resume/types';
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
    return await this.prisma.$transaction(async (tx) => {
      await this.coinService.deductCoins(tx, userId, price);

      const resume = await tx.resume.findUnique({ where: { id: resumeId } });
      const prompt = this.buildEvaluationPrompt(resume);
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

      return {
        score: evaluation.score,
        summary: evaluation.summary,
        strengths: evaluation.strengths,
        weaknesses: evaluation.weaknesses,
        lastUpdated: evaluation.createdAt,
      };
    });
  }

  /**
   * Builds a prompt for AI to evaluate a resume
   */
  private buildEvaluationPrompt(resume: any): string {
    return `
  You are an expert resume reviewer.
  Evaluate the following resume and return your response strictly in JSON format as shown below:
  
  {
    "score": number,                // A score between 0 and 100
    "summary": string,              // A brief summary of the resume's overall quality
    "strengths": string[],          // 2–3 key strengths
    "weaknesses": string[]          // 2–3 key areas for improvement
  }
  
  Resume:
  ${JSON.stringify(resume, null, 2)}
    `.trim();
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
      const trimmed = responseText.trim();

      if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
        throw new Error('Response is not in JSON format.');
      }

      const parsed = JSON.parse(trimmed);

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
