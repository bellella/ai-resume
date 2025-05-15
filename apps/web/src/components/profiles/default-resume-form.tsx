import { ResumeForm } from '@/components/resumes/resume-form';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/lib/store/auth.store';
import { ResumeJson } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { toast } from 'sonner';
import { Form } from '../ui/form';
import { ResumeFormValues } from '@/lib/hooks/use-resume-form';
import { useResumeForm } from '@/lib/hooks/use-resume-form';
import { updateDefaultResume } from '@/lib/api/user.api';
import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import { useEffect } from 'react';
import { FieldErrors } from 'react-hook-form';

export function DefaultResumeForm() {
  const { defaultResumeJson, setDefaultResumeJson } = useAuthStore();
  const { initializeResumeForm } = useResumeEditorStore();
  useEffect(() => {
    if (defaultResumeJson) {
      initializeResumeForm(defaultResumeJson);
    }
  }, [defaultResumeJson]);
  const form = useResumeForm();
  // Update default resume
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
    await updateDefaultResumeMutation.mutateAsync(data);
    setDefaultResumeJson(data);
  };

  const onInvalid = (errors: FieldErrors<ResumeFormValues>) => {
    console.log(errors);
    console.log(form.getValues());
    toast.error('Please fill out all required fields correctly.' + JSON.stringify(errors));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit, onInvalid)}>
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
