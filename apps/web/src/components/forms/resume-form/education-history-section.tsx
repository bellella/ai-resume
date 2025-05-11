'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Car } from 'lucide-react';

export function EducationHistorySection() {
  const form = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'educations',
  });

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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`educations.${index}.graduationMonth`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="d-block">GRADUATION MONTH</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter graduation month" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`educations.${index}.graduationYear`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GRADUATION YEAR</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter graduation year" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="secondary"
          onClick={() =>
            append({
              schoolName: '',
              schoolLocation: '',
              degree: '',
              fieldOfStudy: '',
              graduationMonth: '',
              graduationYear: '',
            })
          }
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
