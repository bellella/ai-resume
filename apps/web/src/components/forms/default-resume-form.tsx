import { ResumeForm } from '@/components/forms/resume-form';
import { Button } from '@/components/ui/button';
import { ResumeFormValues, ResumeJsonFormValues, useResumeForm } from '@/hooks/use-resume-form';
import { updateDefaultResume } from '@/lib/api/user.api';
import { useAuthStore } from '@/lib/store/auth.store';
import { ResumeJson } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Form } from '../ui/form';

export function DefaultResumeForm() {
  const { defaultResumeJson, setDefaultResumeJson } = useAuthStore();
  const form = useResumeForm(defaultResumeJson);
  const updateDefaultResumeMutation = useMutation({
    mutationFn: (defaultResumeJson: ResumeJson) => updateDefaultResume({ defaultResumeJson }),
    onSuccess: () => {
      toast.success('Default resume updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update default resume');
    },
  });

  const handleSubmit = async (data: ResumeFormValues) => {
    const { title, ...resumeJson } = data;
    await updateDefaultResumeMutation.mutateAsync(resumeJson);
    setDefaultResumeJson(resumeJson);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <ResumeForm />
        <div className="flex justify-end mt-4">
          <Button className="gap-1" type="submit" disabled={updateDefaultResumeMutation.isPending}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
