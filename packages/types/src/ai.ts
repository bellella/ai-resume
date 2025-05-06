/**
 * Types of sections that can be generated
 * */
export type GenerateSectionType = 'summary' | 'experience';

/**
 * Data structure for AI evaluation
 * */
export type AiEvaluationData = {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  lastUpdated: Date;
};
