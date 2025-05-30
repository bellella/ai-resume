import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { updatePersonalInfo } from '@/lib/api/user.api';
import { useAuthStore } from '@/lib/store/auth.store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

type PersonalInfoForm = z.infer<typeof personalInfoSchema>;

export function PersonalInfoForm() {
  const { user } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoForm>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  // Update personal info
  const updatePersonalInfoMutation = useMutation({
    mutationFn: (data: PersonalInfoForm) => updatePersonalInfo(data),
    onSuccess: () => {
      toast.success('Personal info updated successfully');
    },
    onError: (error) => {
      toast.error('Failed to update personal info');
    },
  });

  const onSubmit = (data: PersonalInfoForm) => {
    updatePersonalInfoMutation.mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your personal information and profile settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="grid flex-1 gap-4 md:grid-cols-2">
              <FormField id="name" label="Name">
                <Input id="name" {...register('name')} />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </FormField>
              <FormField id="email" label="Email">
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </FormField>
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <Button className="gap-1" type="submit" disabled={updatePersonalInfoMutation.isPending}>
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
