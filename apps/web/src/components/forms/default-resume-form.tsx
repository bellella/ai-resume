import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { ResumeForm } from '@/components/forms/resume-form';
import { useMutation } from '@tanstack/react-query';
import { updateDefaultResume } from '@/lib/api/user.api';
import { useAuthStore } from '@/lib/store/auth.store';
import { ResumeJson } from '@ai-resume/types';
import { toast } from 'sonner';

export function DefaultResumeForm() {
  const { user } = useAuthStore();
  const updateDefaultResumeMutation = useMutation({
    mutationFn: (data: any) => updateDefaultResume(data),
    onSuccess: () => {
      toast.success('Default resume updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update default resume');
    },
  });

  const handleResumeSubmit = (data: any) => {
    updateDefaultResumeMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Default Resume</CardTitle>
        <CardDescription>
          Set your default resume information that will be used when creating new resumes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResumeForm
          onSubmit={handleResumeSubmit}
          defaultValues={user?.defaultResumeJson as ResumeJson}
        />
        <div className="flex justify-end mt-4">
          <Button
            className="gap-1"
            onClick={() => {
              const form = document.querySelector('form');
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }}
            disabled={updateDefaultResumeMutation.isPending}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
