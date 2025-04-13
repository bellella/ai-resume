"use client"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { ResumeForm } from "@/components/profile/resume-form"
import { useRouter } from "next/navigation"
import { useAuth } from '@/hooks/useAuth'

export default function NewResumePage() {
  const router = useRouter()
  const { isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container className="py-6">
      <div className="flex flex-col gap-6">
        <PageHeader title="Create New Resume" description="Fill in your information to create a new resume" />
        <ResumeForm />
      </div>
    </Container>
  )
}

