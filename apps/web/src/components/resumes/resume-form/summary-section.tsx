'use client';

import TextEditor from '@/components/apps/text-editor';
import { CoinConfirmDialog } from '@/components/coins/coin-confirm-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { enhanceSummary } from '@/lib/api/ai.api';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

export function SummarySection() {
  const resumeId = useParams().id as string;

  const form = useFormContext();
  const [openDialog, setOpenDialog] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const skills = form.getValues('skills');
      const workExperiences = form.getValues('workExperiences');
      const educations = form.getValues('educations');
      const userInput = form.getValues('professionalSummary') || '';
      return await enhanceSummary({
        userInput,
        meta: { skills, workExperiences, educations },
        resumeId,
      });
    },
    onSuccess: (data) => {
      form.setValue('professionalSummary', data.result);
      toast.success('Professional summary enhanced with AI');
    },
    onError: (error) => {
      toast.error('Failed to enhance with AI');
    },
  });

  const handleEnhanceWithAI = async () => {
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    setOpenDialog(false);
    mutateAsync();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Professional Summary</CardTitle>
            <CardDescription>Write a brief summary of your professional background</CardDescription>
          </div>
          <Button
            type="button"
            variant="accent"
            size="sm"
            onClick={handleEnhanceWithAI}
            disabled={isPending}
          >
            {isPending ? 'Enhancing...' : 'Enhance with AI'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="professionalSummary"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TextEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>

      <CoinConfirmDialog
        open={openDialog}
        price={1}
        onCancel={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        message={
          <p className="text-center">
            This will consume <strong className="text-coin">1 coin</strong> to enhance your
            professional summary using AI.
          </p>
        }
      />
    </Card>
  );
}
