'use client';

import FullPageLoading from '@/components/home/sections/ui/full-page-loading';
import ResumeEditor, { ResumeSubmitData } from '@/components/resumes/resume-editor';
import { TemplateId, TemplateOptions } from '@/components/templates/templates';
import { useResumeForm } from '@/lib/hooks/use-resume-form';
import { fetchResume, updateResume } from '@/lib/api/resume.api';
import { useAuthGuard } from '@/lib/hooks/use-auth-guard';
import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import { generateResumeThumbnail } from '@/lib/utils/generate-resume-thumbnail';
import { ResumeDetail } from '@ai-resume/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { updateDefaultResume } from '@/lib/api/user.api';

export default function NewResumePage({ params }: { params: { id: string } }) {
  useAuthGuard();
  const router = useRouter();
  const queryClient = useQueryClient();
  const form = useResumeForm();
  const { initializeResumeForm, setEvaluation, setTitle, setTemplateId, setTemplateOptions } =
    useResumeEditorStore();

  // Load resume
  const { data: resume, isLoading } = useQuery<ResumeDetail>({
    queryKey: ['resume', params.id],
    queryFn: () => fetchResume(params.id),
  });

  // initialize resume editor store
  useEffect(() => {
    if (resume) {
      initializeResumeForm(resume.resumeJson);
      setTitle(resume.title);
      setTemplateId(resume.templateId as TemplateId);
      setTemplateOptions(resume.templateJson as TemplateOptions);
      setEvaluation(resume.aiEvaluation);
    }
  }, [resume]);

  // Save resume
  const { mutateAsync: updateResumeMutate, isPending: isSaving } = useMutation({
    mutationFn: async (data: ResumeSubmitData) => {
      const thubmnailImage = await generateResumeThumbnail();
      return updateResume(params.id, { ...data, thubmnailImage });
    },
    onSuccess: (data) => {
      if (!data.id) {
        toast.error('Failed to update resume');
        return;
      }
      toast.success('Resume updated successfully!', {
        action: {
          label: 'Update this as default resume',
          onClick: () => {
            updateDefaultResume({ defaultResumeJson: data.resumeJson });
          },
        },
      });

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

  return <ResumeEditor onSave={handleCreate} isSaving={isSaving} resumeForm={form} />;
}
