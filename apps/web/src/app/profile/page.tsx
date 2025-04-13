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

export default function ProfilePage() {
  return (
    <Container>
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex justify-between items-center">
          <PageHeader title="Profile" description="Manage your account settings and default resume information." />
          <Button className="gap-1">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>This information will be used as default values for your resumes.</CardDescription>
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
                  <Input id="first-name" defaultValue="John" />
                </FormField>
                <FormField id="last-name" label="Last name">
                  <Input id="last-name" defaultValue="Doe" />
                </FormField>
                <FormField id="email" label="Email">
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </FormField>
                <FormField id="phone" label="Phone">
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </FormField>
                <FormField id="title" label="Professional Title" className="md:col-span-2">
                  <Input id="title" defaultValue="Senior Software Engineer" />
                </FormField>
                <FormField id="location" label="Location" className="md:col-span-2">
                  <Input id="location" defaultValue="San Francisco, CA" />
                </FormField>
              </div>
            </div>
          </CardContent>
        </Card>

        <ResumeForm />

        <div className="flex justify-end">
          <Button className="gap-1">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
    </Container>
  )
}

