'use client';

import ResumeEditor from '@/components/resumes/resume-editor';
import { createResume } from '@/lib/api/resume';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewResumePage() {
  const router = useRouter();

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

  return <ResumeEditor onSave={handleCreate} />;
}
