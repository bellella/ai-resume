'use client';

import ResumeEditor, { ResumeSubmitData } from '@/components/resumes/resume-editor';
import { createResume } from '@/lib/api/resume.api';
import { generateResumeThumbnail } from '@/lib/utils/generate-resume-thumbnail';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function NewResumePage() {
  const router = useRouter();

  const { mutateAsync: createResumeMutate, isPending: isSaving } = useMutation({
    mutationFn: async (data: ResumeSubmitData) => {
      const thubmnailImage = await generateResumeThumbnail();
      return createResume({ ...data, thubmnailImage });
    },
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

  const handleCreate = async (data: ResumeSubmitData) => {
    await createResumeMutate(data);
  };

  return <ResumeEditor onSave={handleCreate} isSaving={isSaving} />;
}
