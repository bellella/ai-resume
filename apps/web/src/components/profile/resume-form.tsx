"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { PersonalInfoSection } from "./sections/personal-info-section"
import { WorkHistorySection } from "./sections/work-history-section"
import { EducationHistorySection } from "./sections/education-history-section"
import { SkillsSection } from "./sections/skills-section"
import { SummarySection } from "./sections/summary-section"

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  phone: z.string(),
  email: z.string().email("Invalid email address"),
  workExperiences: z.array(z.object({
    jobTitle: z.string(),
    employer: z.string(),
    city: z.string(),
    province: z.string(),
    startDate: z.string(),
    endDate: z.string(),
  })),
  educations: z.array(z.object({
    schoolName: z.string(),
    schoolLocation: z.string(),
    degree: z.string(),
    fieldOfStudy: z.string(),
    graduationMonth: z.string(),
    graduationYear: z.string(),
  })),
  skills: z.array(z.string()),
  professionalSummary: z.string(),
})

type FormValues = z.infer<typeof formSchema>

interface ResumeFormProps {
  onSubmit: (data: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

export function ResumeForm({ onSubmit, defaultValues }: ResumeFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      email: "",
      professionalSummary: "",
      skills: [],
      workExperiences: [
        {
          jobTitle: "",
          employer: "",
          city: "",
          province: "",
          startDate: "",
          endDate: "",
        },
      ],
      educations: [
        {
          schoolName: "",
          schoolLocation: "",
          degree: "",
          fieldOfStudy: "",
          graduationMonth: "",
          graduationYear: "",
        },
      ],
      ...defaultValues,
    },
  })

  const { fields: workExperienceFields, append: appendWorkExperience, remove: removeWorkExperience } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  })

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "educations",
  })

  const [skills, setSkills] = useState<string[]>([])

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill])
      form.setValue("skills", [...skills, skill])
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const newSkills = skills.filter(skill => skill !== skillToRemove)
    setSkills(newSkills)
    form.setValue("skills", newSkills)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PersonalInfoSection />
        <WorkHistorySection />
        <EducationHistorySection />
        <SkillsSection />
        <SummarySection />
      </form>
    </Form>
  )
} 