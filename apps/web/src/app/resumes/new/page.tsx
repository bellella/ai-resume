'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import ResumeEditor from '@/components/resumes/resume-editor';
import { toast } from 'sonner';
import { createResume } from '@/lib/api/resume';
import { set } from 'date-fns';

export default function NewResumePage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleCreate = async (data: any) => {
    const result = await createResume(data);
    if (!result.id) {
      toast.error('Failed to create resume');
      return;
    }
    toast('Success', {
      description: 'Resume created successfully!',
    });
    setTimeout(() => {
      router.push(`/resumes/${result.id}`);
    }, 1000);
  };

  return <ResumeEditor user={user} onSave={handleCreate} />;
}
