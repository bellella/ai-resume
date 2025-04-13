"use client"

import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { ResumeForm } from "@/components/profile/resume-form"
import { useRouter } from "next/navigation"
import { useAuth } from '@/hooks/useAuth'
import { useState } from "react"

export default function NewResumePage() {
  const router = useRouter()
  const { isLoading } = useAuth()
  const [isCreating, setIsCreating] = useState(false)

  const handleSubmit = async (data: any) => {
    try {
      setIsCreating(true)
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      const response = await fetch('http://localhost:3001/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeJson: data
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create resume')
      }

      const resume = await response.json()
      router.push(`/resume/${resume.id}`)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsCreating(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Container className="py-6">
      <div className="flex flex-col gap-6">
        <PageHeader title="Create New Resume" description="Fill in your information to create a new resume" />
        <ResumeForm onSubmit={handleSubmit} />
      </div>
    </Container>
  )
}

