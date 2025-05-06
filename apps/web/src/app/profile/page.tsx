'use client';

import { DefaultResumeForm } from '@/components/profiles/default-resume-form';
import { PersonalInfoForm } from '@/components/profiles/personal-info-form';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthGuard } from '@/lib/hooks/use-auth-guard';

function PersonalInfoSkeleton() {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Profile"
          description="Manage your account settings and default resume information."
        />
      </div>
      <div className="space-y-6">
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
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { isLoading } = useAuthGuard();

  if (isLoading) {
    return (
      <Container>
        <PersonalInfoSkeleton />
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
