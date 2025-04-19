'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ResumeEditor from '@/components/resumes/resume-editor';
import { createResume } from '@/lib/api/resume';

export default function NewResumePage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleCreate = async (data: any) => {
    const result = await createResume(data);
    router.push(`/resumes/${result.id}`);
  };

  return <ResumeEditor user={user} onSave={handleCreate} />;
}