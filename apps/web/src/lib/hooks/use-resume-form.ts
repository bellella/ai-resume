'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import { useEffect } from 'react';

export function useResumeForm() {
  const { resumeJson } = useResumeEditorStore();

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      profileImage: '',
      city: '',
      province: '',
      postalCode: '',
      phone: '',
      email: '',
      jobTitle: '',
      professionalSummary: '',
      skills: [],
      languages: [],
      links: [],
      workExperiences: [
        {
          companyName: '',
          jobTitle: '',
          city: '',
          province: '',
          startYearMonth: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
          },
          endYearMonth: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
          },
          isCurrent: false,
          achievements: '',
        },
      ],
      educations: [
        {
          schoolName: '',
          schoolLocation: '',
          degree: '',
          fieldOfStudy: '',
          graduationYearMonth: {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
          },
          isCurrent: false,
        },
      ],
    },
  });

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      ...resumeJson,
    });
  }, [resumeJson]);

  return form;
}
export const resumeFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  profileImage: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  email: z.string(),
  jobTitle: z.string(),
  professionalSummary: z.string(),

  workExperiences: z.array(
    z.object({
      companyName: z.string(),
      jobTitle: z.string(),
      city: z.string(),
      province: z.string(),
      startYearMonth: z.object({
        year: z.number(),
        month: z.number(),
      }),
      endYearMonth: z.object({
        year: z.number(),
        month: z.number(),
      }),
      isCurrent: z.boolean(),
      achievements: z.string(),
    })
  ),

  educations: z.array(
    z.object({
      schoolName: z.string(),
      schoolLocation: z.string(),
      degree: z.string(),
      fieldOfStudy: z.string(),
      graduationYearMonth: z.object({
        year: z.number(),
        month: z.number(),
      }),
      isCurrent: z.boolean(),
    })
  ),

  skills: z.array(
    z.object({
      name: z.string(),
      level: z.string(),
    })
  ),

  languages: z.array(
    z.object({
      name: z.string(),
      level: z.string(),
    })
  ),

  links: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export type ResumeFormValues = z.infer<typeof resumeFormSchema>;

export type ResumeJsonFormValues = Omit<ResumeFormValues, 'title'>;
