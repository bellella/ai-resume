import {
  AiEvaluationResponse,
  EnahanceWorkExperienceRequest,
  EnhanceContentResponse,
  EnhanceSummaryRequest,
} from '@ai-resume/types';
import { api } from './ky';

interface SectionResult {
  result: string;
}

/**
 * Run AI evaluation for a resume
 */
export const evaluateResume = async (resumeId: string): Promise<AiEvaluationResponse> => {
  return await api.post(`api/ai/evaluation/${resumeId}`).json();
};

/**
 * Enhance a summary section using AI
 */
export const enhanceSummary = async (
  data: EnhanceSummaryRequest
): Promise<EnhanceContentResponse> => {
  return await api.post(`api/ai/summary`, { json: data }).json();
};

/**
 * Enhance a work experience section using AI
 */
export const enhanceWorkExperience = async (
  data: EnahanceWorkExperienceRequest
): Promise<EnhanceContentResponse> => {
  return await api.post(`api/ai/work-experience`, { json: data }).json();
};
