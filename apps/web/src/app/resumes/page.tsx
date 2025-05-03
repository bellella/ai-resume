'use client';

import FullPageLoading from '@/components/apps/full-page-loading';
import ResumeCard from '@/components/resumes/resume-editor/resume-card';
import ResumeCardSkeleton from '@/components/resumes/resume-editor/resume-card-skeleton';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { fetchResumes } from '@/lib/api/resume';
import { useAuthGuard } from '@/lib/hooks/useAuthGuard';
import { ResumeItem } from '@ai-resume/types';
import { useQuery } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ResumesPage() {
  useAuthGuard();
  const { data: resumes, isLoading } = useQuery<ResumeItem[]>({
    queryKey: ['resumes'],
    queryFn: fetchResumes,
  });

  if (isLoading) {
    return <FullPageLoading />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-8">
        <PageHeader
          title="My Resumes"
          description="Manage and organize all your resumes in one place."
        >
          <Link href="/resumes/new">
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              Create New Resume
            </Button>
          </Link>
        </PageHeader>

        {/* <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search resumes..." className="pl-8" />
          </div>

          <div className="flex gap-2 items-center">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="a-z">A-Z</SelectItem>
                <SelectItem value="z-a">Z-A</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {resumes && resumes.length > 0 ? (
            resumes.map((resume) => <ResumeCard resume={resume} key={resume.id} />)
          ) : (
            <div className="text-center text-muted-foreground">No resumes available.</div>
          )}
        </div>
      </div>
    </Container>
  );
}
