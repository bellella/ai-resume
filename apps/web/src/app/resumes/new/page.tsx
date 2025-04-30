'use client';

import ResumeEditor from '@/components/resumes/resume-editor';
import { createResume } from '@/lib/api/resume';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export default function NewResumePage() {
  const router = useRouter();

  const { mutateAsync: createResumeMutate, isPending: isSaving } = useMutation({
    mutationFn: createResume,
    mutationKey: ['createResume'],
    onSuccess: (data) => {
      toast('Success', {
        description: 'Resume created successfully!',
      });
      router.push(`/resumes/${data.id}`);
    },
    onError: () => {
      toast.error('Failed to create resume');
    },
  });

  const handleCreate = async (data: any) => {
    await createResumeMutate(data);
  };

  return <ResumeEditor onSave={handleCreate} isSaving={isSaving} />;
}
