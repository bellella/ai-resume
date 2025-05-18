'use client';

import ResumeStartDialog from '@/components/resumes/resume-start-dialog';
import ResumeEditor, { ResumeSubmitData } from '@/components/resumes/resume-editor';
import { createResume } from '@/lib/api/resume.api';
import { generateResumeThumbnail } from '@/lib/utils/generate-resume-thumbnail';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useResumeForm } from '@/lib/hooks/use-resume-form';
import { ResumeJson, TemplateJson } from '@ai-resume/types';
import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import { updateDefaultResume } from '@/lib/api/user.api';
import { useEffect } from 'react';

export default function NewResumePage() {
  const router = useRouter();
  const form = useResumeForm();
  const { initializeResumeForm, templateOptions, templateId } = useResumeEditorStore();

  useEffect(() => {
    initializeResumeForm(undefined);
  }, [initializeResumeForm]);

  const { mutateAsync: createResumeMutate, isPending: isSaving } = useMutation({
    mutationFn: async (data: ResumeSubmitData) => {
      const thumbnailImage = await generateResumeThumbnail();
      return createResume({ ...data, thumbnailImage });
    },
    mutationKey: ['createResume'],
    onSuccess: (data) => {
      toast('Success', {
        description: 'Resume created successfully!',
        action: {
          label: 'Update this as default resume',
          onClick: () => {
            updateDefaultResume({ defaultResumeJson: data.resumeJson });
          },
        },
      });
      router.push(`/resumes/${data.id}`);
    },
    onError: () => {
      toast.error('Failed to create resume');
    },
  });

  const handleCreate = async () => {
    const resumeFormValues = form.getValues();
    await createResumeMutate({
      title: 'New Resume',
      resumeJson: resumeFormValues as ResumeJson,
      templateId,
      templateJson: templateOptions as TemplateJson,
    });
  };

  return (
    <>
      <ResumeStartDialog form={form} />
      <ResumeEditor onSave={handleCreate} isSaving={isSaving} resumeForm={form} />
    </>
  );
}
