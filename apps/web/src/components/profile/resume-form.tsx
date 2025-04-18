'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfoSection } from './sections/personal-info-section';
import { WorkHistorySection } from './sections/work-history-section';
import { EducationHistorySection } from './sections/education-history-section';
import { SkillsSection } from './sections/skills-section';
import { SummarySection } from './sections/summary-section';
import { ResumeJson } from '@ai-resume/types';

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
  onSubmit: (data: FormValues) => void;
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
      getValues: () => form.getValues() as ResumeJson,
    }));

    const {
      fields: workExperienceFields,
      append: appendWorkExperience,
      remove: removeWorkExperience,
    } = useFieldArray({
      control: form.control,
      name: 'workExperiences',
    });

    const {
      fields: educationFields,
      append: appendEducation,
      remove: removeEducation,
    } = useFieldArray({
      control: form.control,
      name: 'educations',
    });

    const [skills, setSkills] = useState<string[]>(defaultValues?.skills || []);

    const addSkill = (skill: string) => {
      if (skill && !skills.includes(skill)) {
        const newSkills = [...skills, skill];
        setSkills(newSkills);
        form.setValue('skills', newSkills);
      }
    };

    const removeSkill = (skillToRemove: string) => {
      const newSkills = skills.filter((skill) => skill !== skillToRemove);
      setSkills(newSkills);
      form.setValue('skills', newSkills);
    };

    // ✅ 실시간 프리뷰를 위한 watch
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
            form.handleSubmit(onSubmit)(e);
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
