'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { composeWithAi } from '@/lib/api/ai';
import { CoinConfirmDialog } from '@/components/coins/coin-confirm-dialog';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';

export function SummarySection() {
  const resumeId = useParams().id;

  const form = useFormContext();
  const [openDialog, setOpenDialog] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      const skills = form.getValues('skills');
      const workExperiences = form.getValues('workExperiences');
      const text = form.getValues('professionalSummary') || '';
      return await composeWithAi('summary', {
        text,
        meta: { skills, workExperiences },
        resumeId: resumeId as string,
      });
    },
    onSuccess: (data) => {
      form.setValue('professionalSummary', data.result);
    },
    onError: (error) => {
      toast.error('Failed to compose with AI');
    },
  });

  const handleComposeWithAI = async () => {
    setOpenDialog(true);
  };

  const handleConfirm = async () => {
    setOpenDialog(false);
    const result = await mutateAsync();
    console.log(result);
    alert(result.result);
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
            onClick={handleComposeWithAI}
            disabled={isPending}
          >
            {isPending ? 'Composing...' : 'Compose with AI'}
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
                <Textarea
                  placeholder="Write your professional summary here..."
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>

      <CoinConfirmDialog
        open={openDialog && !isPending}
        price={1}
        onCancel={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
      />
    </Card>
  );
}
