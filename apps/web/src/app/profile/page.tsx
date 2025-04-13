"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Save } from "lucide-react"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { FormField } from "@/components/ui/form-field"
import { ResumeForm } from "@/components/profile/resume-form"
import { useAuth } from "@/hooks/useAuth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchPersonalInfo, updateDefaultResume, updatePersonalInfo } from "@/lib/api/user"
import { useState } from "react"
import { PersonalInfo } from "@ai-resume/types"
import { Skeleton } from "@/components/ui/skeleton"

function PersonalInfoSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal information and profile settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-20" />
          </div>

          <div className="grid flex-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

export default function ProfilePage() {
  const { user } = useAuth()
  const { data: personalInfo, isLoading } = useQuery({
    queryKey: ['personalInfo'],
    queryFn: fetchPersonalInfo
  })

  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: personalInfo?.data?.firstName || '',
    lastName: personalInfo?.data?.lastName || '',
    email: personalInfo?.data?.email || '',
    phone: personalInfo?.data?.phone || '',
    title: personalInfo?.data?.title || '',
    location: personalInfo?.data?.location || '',
  })

  const updatePersonalInfoMutation = useMutation({
    mutationFn: (data: PersonalInfo) => updatePersonalInfo(data),
    onSuccess: () => {
      // TODO: Show success toast
    },
    onError: (error) => {
      console.error('Failed to update personal info:', error)
      // TODO: Show error toast
    }
  })

  const updateDefaultResumeMutation = useMutation({
    mutationFn: (data: any) => updateDefaultResume(data),
    onSuccess: () => {
      // TODO: Show success toast
    },
    onError: (error) => {
      console.error('Failed to update default resume:', error)
      // TODO: Show error toast
    }
  })

  const handlePersonalInfoSubmit = () => {
    updatePersonalInfoMutation.mutate(formData)
  }

  const handleResumeSubmit = (data: any) => {
    updateDefaultResumeMutation.mutate(data)
  }

  if (isLoading) {
    return (
      <Container>
        <div className="flex flex-col gap-8 md:gap-12">
          <div className="flex justify-between items-center">
            <PageHeader title="Profile" description="Manage your account settings and default resume information." />
          </div>
          <PersonalInfoSkeleton />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex justify-between items-center">
          <PageHeader title="Profile" description="Manage your account settings and default resume information." />
        </div>

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="resume">Default Resume</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal information and profile settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg" alt="Profile" />
                      <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase() || 'JD'}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>

                  <div className="grid flex-1 gap-4 md:grid-cols-2">
                    <FormField id="first-name" label="First name">
                      <Input 
                        id="first-name" 
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      />
                    </FormField>
                    <FormField id="last-name" label="Last name">
                      <Input 
                        id="last-name" 
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      />
                    </FormField>
                    <FormField id="email" label="Email">
                      <Input 
                        id="email" 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </FormField>
                    <FormField id="phone" label="Phone">
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </FormField>
                    <FormField id="title" label="Professional Title" className="md:col-span-2">
                      <Input 
                        id="title" 
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </FormField>
                    <FormField id="location" label="Location" className="md:col-span-2">
                      <Input 
                        id="location" 
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </FormField>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    className="gap-1"
                    onClick={handlePersonalInfoSubmit}
                    disabled={updatePersonalInfoMutation.isPending}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>Default Resume</CardTitle>
                <CardDescription>Set your default resume information that will be used when creating new resumes.</CardDescription>
              </CardHeader>
              <CardContent>
                <ResumeForm onSubmit={handleResumeSubmit} defaultValues={user?.defaultResumeJson} />
                <div className="flex justify-end mt-4">
                  <Button 
                    className="gap-1"
                    onClick={() => {
                      const form = document.querySelector('form')
                      if (form) {
                        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                      }
                    }}
                    disabled={updateDefaultResumeMutation.isPending}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  )
}

