import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';
import { GenerateSectionType } from '@ai-resume/types';
import { CoinService } from '../coins/coin.service';

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
  async evaluateResumeWithAi(resumeId: string, userId: string) {
    const price = 1;
    return await this.prisma.$transaction(async (tx) => {
      await this.coinService.deductCoins(tx, userId, price);

      const resume = await tx.resume.findUnique({ where: { id: resumeId } });
      const prompt = this.buildEvaluationPrompt(resume);
      const raw = await this.chat(prompt);
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
   * Composes a section of a resume using AI and deducts coins from the user
   */
  async composeSectionWithAi(
    type: GenerateSectionType,
    userId: string,
    resumeId?: string,
    text: string = '',
    otherInfo: Record<string, any> = {}
  ) {
    const price = 1;

    return await this.prisma.$transaction(async (tx) => {
      await this.coinService.deductCoins(tx, userId, price);

      const prompt = this.buildSectionPrompt(type, text, otherInfo);
      const result = await this.chat(prompt);

      await tx.transaction.create({
        data: {
          userId,
          type: 'USAGE',
          price,
          name: `Compose ${type} section`,
          meta: {
            resumeId,
          },
        },
      });

      return { result };
    });
  }

  /**
   * Builds a prompt for AI to compose a resume section
   */
  private buildSectionPrompt(
    type: GenerateSectionType,
    text: string,
    otherInfo: Record<string, any>
  ): string {
    const sectionName = type === 'summary' ? 'Professional Summary' : 'Work Experience';
    const userText = text?.trim() || '(none)';

    return `
You are a professional AI resume assistant.

The user has requested help with their "${sectionName}" section.

---

✏️ User's current ${sectionName}:
"""
${userText}
"""

📄 Additional information in JSON format:
${JSON.stringify(otherInfo, null, 2)}

---

🧠 Instructions:
- If the user's input is well-written and complete, improve it to sound more professional and impactful.
- If the input is missing or too short, generate a brand-new ${sectionName} using the metadata above.
- Keep it concise, professional, and optimized for recruiters.
- Return only the improved or newly generated text. Do not include explanations.
`.trim();
  }

  /**
   * Sends a prompt to the AI chat model and returns the response
   */
  async chat(prompt: string) {
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
