import { Education, WorkExperience } from './resume.type';

/**
 * Types of sections that can be generated
 * */
export type EnhanceContentType = 'summary' | 'work-experience';

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

/**
 * Data structure for AI enhancement request for summary section
 * */
export type EnhanceSummaryRequest = {
  userInput?: string;
  meta: SummaryMeta;
  resumeId: string;
};

export type SummaryMeta = {
  skills: string[];
  workExperiences: WorkExperience[];
  educations: Education[];
};

/**
 * Data structure for AI enhancement request for work experience section
 * */
export type EnahanceWorkExperienceRequest = {
  userInput?: string;
  meta: WorkExperienceMeta;
  resumeId: string;
};

export type WorkExperienceMeta = {
  workExperience: WorkExperience;
};

/**
 * Data structure for AI enhancement response
 * */
export type EnhanceContentResponse = {
  result: string;
};

export type AiEvaluationResponse = AiEvaluationData;
