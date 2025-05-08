'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { ResumeJson } from '@ai-resume/types';

export function useResumeForm(defaultValues?: ResumeJson) {
  return useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      title: 'New Resume',
      firstName: '',
      lastName: '',
      city: '',
      province: '',
      postalCode: '',
      phone: '',
      email: '',
      jobTitle: '',
      professionalSummary: '',
      skills: [],
      workExperiences: [
        {
          companyName: '',
          jobTitle: '',
          city: '',
          province: '',
          startDate: '',
          endDate: '',
          achievements: '',
        },
      ],
      educations: [
        {
          schoolName: '',
          schoolLocation: '',
          degree: '',
          fieldOfStudy: '',
          graduationMonth: '',
          graduationYear: '',
        },
      ],
      ...defaultValues,
    },
  });
}

export const resumeFormSchema = z.object({
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  email: z.string().email('Invalid email address'),
  jobTitle: z.string(),
  workExperiences: z.array(
    z.object({
      companyName: z.string(),
      jobTitle: z.string(),
      city: z.string(),
      province: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      achievements: z.string(),
    })
  ),
  educations: z.array(
    z.object({
      schoolName: z.string(),
      schoolLocation: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string(),
      graduationMonth: z.string(),
      graduationYear: z.string(),
    })
  ),
  skills: z.array(z.string()),
  professionalSummary: z.string(),
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>;

export type ResumeJsonFormValues = Omit<ResumeFormValues, 'title'>;
