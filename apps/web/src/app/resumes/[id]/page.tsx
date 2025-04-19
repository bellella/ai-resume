'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ResumeEditor from '@/components/resumes/resume-editor';
import { createResume, fetchResume } from '@/lib/api/resume';
import { useQuery } from '@tanstack/react-query';
import { ResumeDetail } from '@ai-resume/types';

export default function NewResumePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  const { data: resume, isLoading } = useQuery<ResumeDetail>({
    queryKey: ['resume', params.id],
    queryFn: () => fetchResume(params.id),
  });

  const handleCreate = async (data: any) => {
    const result = await createResume(data);
    router.push(`/resumes/${result.id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!resume) {
    return <div>이력서를 찾을 수 없습니다</div>;
  }

  return <ResumeEditor user={user} onSave={handleCreate} initialFormData={resume.resumeJson} />;
}
