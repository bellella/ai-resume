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
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isSavingPersonal, setIsSavingPersonal] = useState(false)
  const [isSavingResume, setIsSavingResume] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    title: "Senior Software Engineer",
    location: "San Francisco, CA"
  })

  const handlePersonalInfoSubmit = async () => {
    try {
      setIsSavingPersonal(true)
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      const response = await fetch('http://localhost:3001/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(personalInfo),
      })

      if (!response.ok) {
        throw new Error('Failed to save personal information')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSavingPersonal(false)
    }
  }

  const handleResumeSubmit = async (data: any) => {
    try {
      setIsSavingResume(true)
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      const response = await fetch('http://localhost:3001/resumes/default', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          defaultResumeJson: data
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save default resume')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSavingResume(false)
    }
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
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
                  </div>

                  <div className="grid flex-1 gap-4 md:grid-cols-2">
                    <FormField id="first-name" label="First name">
                      <Input 
                        id="first-name" 
                        value={personalInfo.firstName}
                        onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      />
                    </FormField>
                    <FormField id="last-name" label="Last name">
                      <Input 
                        id="last-name" 
                        value={personalInfo.lastName}
                        onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      />
                    </FormField>
                    <FormField id="email" label="Email">
                      <Input 
                        id="email" 
                        type="email" 
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      />
                    </FormField>
                    <FormField id="phone" label="Phone">
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      />
                    </FormField>
                    <FormField id="title" label="Professional Title" className="md:col-span-2">
                      <Input 
                        id="title" 
                        value={personalInfo.title}
                        onChange={(e) => setPersonalInfo({...personalInfo, title: e.target.value})}
                      />
                    </FormField>
                    <FormField id="location" label="Location" className="md:col-span-2">
                      <Input 
                        id="location" 
                        value={personalInfo.location}
                        onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                      />
                    </FormField>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button 
                    className="gap-1" 
                    disabled={isSavingPersonal}
                    onClick={handlePersonalInfoSubmit}
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
                    disabled={isSavingResume}
                    onClick={() => {
                      const form = document.querySelector('form')
                      if (form) {
                        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
                      }
                    }}
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

