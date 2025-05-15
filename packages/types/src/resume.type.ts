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
  thumbnailImage?: string;
};

/**
 * Response for creating a resume
 * */
export type CreateResumeResponse = {
  id: string;
  resumeJson: ResumeJson;
};

/**
 * Payload for updating a resume
 * */
export type UpdateResumeRequest = {
  title: string;
  resumeJson: ResumeJson;
  thubmnailImage?: string;
};

/**
 * Response for updating a resume
 */
export type UpdateResumeResponse = {
  id: string;
  resumeJson: ResumeJson;
};

/**
 * JSON structure for a resume
 * */
export type ResumeJson = {
  firstName: string;
  lastName: string;
  profileImage: string;
  jobTitle: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  professionalSummary: string;
  skills?: SkillItem[];
  languages?: LanguageItem[];
  workExperiences: WorkExperience[];
  educations: Education[];
  links?: LinkItem[];
  templateId?: string;
};

export type WorkExperience = {
  companyName: string;
  jobTitle: string;
  city: string;
  province: string;
  startYearMonth: YearMonth;
  endYearMonth: YearMonth;
  isCurrent: boolean;
  achievements: string;
};

export type Education = {
  schoolName: string;
  schoolLocation: string;
  degree: string;
  fieldOfStudy: string;
  graduationYearMonth: YearMonth;
  isCurrent: boolean;
};

export type YearMonth = {
  year: number;
  month: number;
};

export type SkillLevel = 'none' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type SkillItem = {
  name: string;
  level: SkillLevel | string;
};

export type LinkItem = {
  name: string;
  url: string;
};

export type LanguageLevel = 'none' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Native';

export type LanguageItem = {
  name: string;
  level: LanguageLevel | string;
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
      thubmnailImage: true;
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
