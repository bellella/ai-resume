'use client';

import { YearMonthPicker } from '@/components/forms/year-month-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export function EducationHistorySection() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

  const appendItem = () => {
    append({
      schoolName: '',
      schoolLocation: '',
      degree: '',
      fieldOfStudy: '',
      graduationYearMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      },
      isCurrent: false,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Add your educational background</CardDescription>
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
                  name={`educations.${index}.schoolName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SCHOOL NAME</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.schoolLocation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SCHOOL LOCATION</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter school location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`educations.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DEGREE</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter degree" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.fieldOfStudy`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>FIELD OF STUDY</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter field of study" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={`educations.${index}.graduationYearMonth`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="d-block">GRADUATION DATE</FormLabel>
                    <FormControl>
                      <YearMonthPicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`educations.${index}.isCurrent`}
                render={({ field }) => (
                  <div className="mt-2 flex items-center space-x-2">
                    <Checkbox
                      id={`education-isCurrent-${index}`}
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                    />
                    <label htmlFor={`education-isCurrent-${index}`} className="text-sm font-medium">
                      I currently study here
                    </label>
                  </div>
                )}
              />
            </div>
          ))}
        </div>
        <Button type="button" variant="secondary" onClick={appendItem} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
