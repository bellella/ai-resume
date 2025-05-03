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
import { composeWithAi } from '@/lib/api/ai';
import { CoinConfirmDialog } from '@/components/coins/coin-confirm-dialog';
import { toast } from 'sonner';

export function WorkHistorySection() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workExperiences',
  });

  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (index: number) => {
      const { jobTitle, employer, city, province, startDate, endDate } = form.getValues(
        `workExperiences.${index}`
      );
      const text = form.getValues(`workExperiences.${index}.achievements`) || '';
      const meta = { jobTitle, employer, city, province, startDate, endDate };
      return await composeWithAi('experience', { text, meta });
    },
    onSuccess: (data, index) => {
      form.setValue(`workExperiences.${index}.achievements`, data.result);
      toast.success('Work experience composed with AI');
    },
  });

  const handleComposeWithAI = (index: number) => {
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
        {fields.map((field, index) => (
          <Card key={field.id} className="space-y-4 p-4 border rounded-lg relative">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2"
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
                name={`workExperiences.${index}.employer`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EMPLOYER</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter employer name" {...field} />
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
                  <div className="flex justify-between items-end">
                    <FormLabel>ACHIEVEMENTS</FormLabel>
                    <Button
                      type="button"
                      variant="accent"
                      size="sm"
                      onClick={() => handleComposeWithAI(index)}
                      disabled={isPending}
                    >
                      Compose with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea placeholder="Enter achievements" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        ))}
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
        />
      </CardContent>
    </Card>
  );
}
