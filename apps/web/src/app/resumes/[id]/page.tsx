'use client';

import ResumeEditor from '@/components/resumes/resume-editor';
import { useAuth } from '@/lib/hooks/useAuth';
import { fetchResume, updateResume } from '@/lib/api/resume';
import { ResumeDetail } from '@ai-resume/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

export default function NewResumePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: resume, isLoading } = useQuery<ResumeDetail>({
    queryKey: ['resume', params.id],
    queryFn: () => fetchResume(params.id),
  });

  const handleCreate = async (data: any) => {
    const result = await updateResume(params.id, data);
    if (!result.id) {
      toast.error('Failed to update resume');
      return;
    }
    toast('Success', {
      description: 'Resume updated successfully!',
    });
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!resume) {
    return <div>Resume not found</div>;
  }

  return <ResumeEditor user={user} onSave={handleCreate} resume={resume} />;
}
