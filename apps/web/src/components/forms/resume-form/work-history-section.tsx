'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { enhanceWorkExperience } from '@/lib/api/ai.api';
import { CoinConfirmDialog } from '@/components/coins/coin-confirm-dialog';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import TextEditor from '@/components/apps/text-editor';

type WorkHistorySectionProps = {
  requireAuth: () => boolean;
};

export function WorkHistorySection({ requireAuth }: WorkHistorySectionProps) {
  const form = useFormContext();
  const resumeId = useParams().id as string;
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workExperiences',
  });

  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (index: number) => {
      const workExperience = form.getValues(`workExperiences.${index}`);
      const userInput = form.getValues(`workExperiences.${index}.achievements`) || '';
      return await enhanceWorkExperience({
        userInput,
        meta: { workExperience },
        resumeId,
      });
    },
    onSuccess: (data, index) => {
      form.setValue(`workExperiences.${index}.achievements`, data.result);
      toast.success('Work experience enhanced with AI');
    },
  });

  const handleEnhanceWithAI = (index: number) => {
    if (!requireAuth()) return;
    setOpenDialogIndex(index);
  };

  const handleConfirm = async () => {
    if (openDialogIndex !== null) {
      await mutateAsync(openDialogIndex);
      setOpenDialogIndex(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Add your work history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          {fields.map((field, index) => (
            <div key={field.id} className="form-list-item">
              <Button
                type="button"
                variant="trash"
                size="icon"
                className="absolute top-1 right-0"
                onClick={() => remove(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.jobTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>JOB TITLE</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.companyName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>COMPANY</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.city`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CITY</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.province`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PROVINCE</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>START DATE</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`workExperiences.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>END DATE</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`workExperiences.${index}.achievements`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-end mt-3">
                      <FormLabel>ACHIEVEMENTS</FormLabel>
                      <Button
                        type="button"
                        variant="accent"
                        size="sm"
                        onClick={() => handleEnhanceWithAI(index)}
                        disabled={isPending}
                      >
                        {isPending ? 'Enhancing...' : 'Enhance with AI'}
                      </Button>
                    </div>
                    <FormControl>
                      <TextEditor value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              jobTitle: '',
              employer: '',
              city: '',
              province: '',
              startDate: '',
              endDate: '',
              achievements: '',
            })
          }
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Work Experience
        </Button>

        <CoinConfirmDialog
          open={openDialogIndex !== null && !isPending}
          price={1}
          onCancel={() => setOpenDialogIndex(null)}
          onConfirm={handleConfirm}
          message={
            <p className="text-center">
              This will consume <strong className="text-coin">1 coin</strong> to enhance your
              work experience using AI.
            </p>
          }
        />
      </CardContent>
    </Card>
  );
}
