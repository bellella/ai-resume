'use client';

import { Form } from '@/components/ui/form';
import { ResumeJson } from '@ai-resume/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import * as z from 'zod';
import { EducationHistorySection } from './sections/education-history-section';
import { PersonalInfoSection } from './sections/personal-info-section';
import { SkillsSection } from './sections/skills-section';
import { SummarySection } from './sections/summary-section';
import { WorkHistorySection } from './sections/work-history-section';

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  email: z.string().email('Invalid email address'),
  workExperiences: z.array(
    z.object({
      jobTitle: z.string(),
      employer: z.string(),
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

type FormValues = z.infer<typeof formSchema>;

interface ResumeFormProps {
  onSubmit?: (data: FormValues) => void;
  onChange?: (data: ResumeJson) => void;
  defaultValues?: ResumeJson;
}

export interface ResumeFormRef {
  reset: (values?: ResumeJson) => void;
  getValues: () => ResumeJson;
}

export const ResumeForm = forwardRef<ResumeFormRef, ResumeFormProps>(
  ({ onSubmit, onChange, defaultValues }, ref) => {
    const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstName: '',
        lastName: '',
        jobTitle: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
        email: '',
        professionalSummary: '',
        skills: [],
        workExperiences: [
          {
            jobTitle: '',
            employer: '',
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

    useImperativeHandle(ref, () => ({
      reset: (values?: ResumeJson) => {
        form.reset(values);
      },
      getValues: () => form.getValues() as unknown as ResumeJson,
    }));

    useEffect(() => {
      const subscription = form.watch((value) => {
        onChange?.(value as ResumeJson);
      });
      return () => subscription.unsubscribe();
    }, [form.watch, onChange]);

    return (
      <Form {...form}>
        <form
          id="resume-form"
          onSubmit={(e) => {
            if (onSubmit) {
              form.handleSubmit(onSubmit)(e);
            }
          }}
          className="space-y-6"
        >
          <PersonalInfoSection />
          <WorkHistorySection />
          <EducationHistorySection />
          <SkillsSection />
          <SummarySection />
        </form>
      </Form>
    );
  }
);
