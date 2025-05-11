'use client';

import FullPageLoading from '@/components/home/sections/ui/full-page-loading';
import ResumeEditor, { ResumeSubmitData } from '@/components/resumes/resume-editor';
import { fetchResume, updateResume } from '@/lib/api/resume.api';
import { useAuthGuard } from '@/lib/hooks/use-auth-guard';
import { ResumeDetail } from '@ai-resume/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export default function NewResumePage({ params }: { params: { id: string } }) {
  useAuthGuard();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: resume, isLoading } = useQuery<ResumeDetail>({
    queryKey: ['resume', params.id],
    queryFn: () => fetchResume(params.id),
  });

  const { mutateAsync: updateResumeMutate, isPending: isSaving } = useMutation({
    mutationFn: (data: any) => updateResume(params.id, data),
    onSuccess: (data) => {
      if (!data.id) {
        toast.error('Failed to update resume');
        return;
      }
      toast.success('Resume updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['resume', params.id] });
      router.refresh();
    },
    onError: () => {
      toast.error('Failed to update resume');
    },
  });

  const handleCreate = async (data: ResumeSubmitData) => {
    await updateResumeMutate(data);
  };

  if (isLoading) {
    return <FullPageLoading />;
  }

  return <ResumeEditor onSave={handleCreate} resume={resume} isSaving={isSaving} />;
}
