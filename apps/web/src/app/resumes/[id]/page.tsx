'use client';

import ResumeEditor from '@/components/resumes/resume-editor';
import { toast } from '@/components/ui/use-toast';
import { fetchResume, updateResume } from '@/lib/api/resume';
import { ResumeDetail } from '@ai-resume/types';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthGuard } from '@/lib/hooks/use-auth-guard';
import FullPageLoading from '@/components/home/sections/elements/full-page-loading';
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

  const handleCreate = async (data: any) => {
    await updateResumeMutate(data);
  };

  if (isLoading) {
    return <FullPageLoading />;
  }

  return <ResumeEditor onSave={handleCreate} resume={resume} isSaving={isSaving} />;
}
