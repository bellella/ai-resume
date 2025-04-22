import { Prisma } from '@ai-resume/db';

export interface CreateResumePayload {
  title: string;
  ai?: {
    content: boolean;
    grammar: boolean;
  };
  resumeJson: ResumeJson;
}

export interface CreateResumeResponse
  extends Prisma.ResumeGetPayload<{
    select: {
      id: true;
    };
  }> {}

export type ResumeJson = {
  firstName: string;
  lastName: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  email: string;
  professionalSummary: string;
  skills: string[];
  workExperiences: {
    jobTitle: string;
    employer: string;
    city: string;
    province: string;
    startDate: string;
    endDate: string;
  }[];
  educations: {
    schoolName: string;
    schoolLocation: string;
    degree: string;
    fieldOfStudy: string;
    graduationMonth: string;
    graduationYear: string;
  }[];
  templateId?: string;
};

// export interface TemplateJson {
//   color: string;
//   fontSize: number;
//   sectionSpacing: number;
//   fontFamily: string;
// }
export type TemplateJson = {
  color: string;
  fontSize: number;
  sectionSpacing: number;
  fontFamily: string;
};
export interface ResumeItem
  extends Prisma.ResumeGetPayload<{
    select: {
      id: true;
      title: true;
      status: true;
      previewImageUrl: true;
      createdAt: true;
      updatedAt: true;
      templateId: true;
    };
  }> {}

export interface ResumeDetail
  extends Prisma.ResumeGetPayload<{
    select: {
      id: true;
      title: true;
      status: true;
      createdAt: true;
      updatedAt: true;
      templateId: true;
    };
  }> {
  resumeJson: ResumeJson;
  templateJson: TemplateJson;
}
