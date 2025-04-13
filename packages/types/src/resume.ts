export type ResumeInput = {
  ai?: {
    content: boolean;
    grammar: boolean;
  };
  resumeJson: ResumeJson;
};

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
};
