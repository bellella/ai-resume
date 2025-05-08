'use client';

import { DefaultResumeForm } from '@/components/forms/default-resume-form';
import { PersonalInfoForm } from '@/components/forms/personal-info-form';
import { ProfileSkeleton } from '@/components/profiles/profile-skeleton';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthGuard } from '@/lib/hooks/use-auth-guard';

export default function ProfilePage() {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <Container>
        <ProfileSkeleton />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex justify-between items-center">
          <PageHeader
            title="Profile"
            description="Manage your account settings and default resume information."
          />
        </div>
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="resume">Default Resume</TabsTrigger>
          </TabsList>
          <TabsContent value="personal">
            <PersonalInfoForm />
          </TabsContent>
          <TabsContent value="resume">
            <DefaultResumeForm />
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
