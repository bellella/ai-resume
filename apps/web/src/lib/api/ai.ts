import { AiEvaluationData, GenerateSectionType } from '@ai-resume/types';
import { api } from './ky';

interface SectionRequest {
  text?: string;
  meta: Record<string, any>;
  resumeId?: string;
}

interface SectionResult {
  result: string;
}

/**
 * Run AI evaluation for a resume
 */
export const evaluateResume = async (resumeId: string): Promise<AiEvaluationData> => {
  return await api.post(`api/ai/evaluation/${resumeId}`).json();
};

/**
 * Generate or improve a specific resume section using AI
 */
export const composeWithAi = async (
  type: GenerateSectionType,
  data: SectionRequest
): Promise<SectionResult> => {
  return await api
    .post(`api/ai/${type}`, {
      json: data,
    })
    .json();
};
