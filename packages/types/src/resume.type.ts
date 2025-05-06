import { AiEvaluation, Prisma } from '@ai-resume/db';

/**
 * Response for fetching a resume
 */
export type FetchResumesResponse = ResumeItem[];

/**
 * Response for fetching a resume detail
 */
export type FetchResumeResponse = ResumeDetail;

/**
 * Payload for creating a resume
 * */
export type CreateResumeRequest = {
  title: string;
  resumeJson: ResumeJson;
};

/**
 * Response for creating a resume
 * */
export type CreateResumeResponse = {
  id: string;
};

/**
 * Payload for updating a resume
 * */
export type UpdateResumeRequest = {
  title: string;
  resumeJson: ResumeJson;
};

/**
 * Response for updating a resume
 */
export type UpdateResumeResponse = {
  id: string;
};

/**
 * JSON structure for a resume
 * */
export type ResumeJson = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  professionalSummary: string;
  skills: string[];
  workExperiences: WorkExperience[];
  educations: Education[];
  templateId?: string;
};

export type WorkExperience = {
  companyName: string;
  jobTitle: string;
  city: string;
  province: string;
  startDate: string;
  endDate: string;
  achievements: string;
};

export type Education = {
  schoolName: string;
  schoolLocation: string;
  degree: string;
  fieldOfStudy: string;
  graduationMonth: string;
  graduationYear: string;
};

/** * JSON structure for a template */
export type TemplateJson = {
  color: string;
  fontSize: number;
  sectionSpacing: number;
  fontFamily: string;
};
/** * Represents a resume item with selected fields */
export interface ResumeItem
  extends Prisma.ResumeGetPayload<{
    select: {
      id: true;
      title: true;
      createdAt: true;
      updatedAt: true;
      templateId: true;
    };
  }> {}

/**
 * Detailed information about a resume
 * */
export interface ResumeDetail
  extends Prisma.ResumeGetPayload<{
    select: {
      id: true;
      title: true;
      createdAt: true;
      updatedAt: true;
      templateId: true;
    };
  }> {
  aiEvaluation?: AiEvaluationDetail;
  resumeJson?: ResumeJson;
  templateJson?: TemplateJson;
}

export type AiEvaluationDetail = {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  lastUpdated: Date;
};
