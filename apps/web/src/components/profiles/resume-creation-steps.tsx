'use client';

import { ResumeForm, ResumeFormRef } from '@/components/profiles/resume-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { createResume } from '@/lib/api/resume';
import { ResumeJson } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DefaultTemplate from '@/components/templates/default';
import ModernTemplate from '@/components/templates/modern';

export function ResumeCreationSteps() {
  const router = useRouter();
  const { isLoading, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('default');
  const formRef = useRef<ResumeFormRef>(null);
  const [formData, setFormData] = useState<ResumeJson | null>(null);

  const templates = [
    { id: 'default', name: 'Default Template', component: DefaultTemplate },
    { id: 'modern', name: 'Modern Template', component: ModernTemplate },
  ];

  const createResumeMutation = useMutation({
    mutationFn: (data: any) => createResume(data),
    onSuccess: (resume) => router.push(`/resume/${resume.id}`),
    onError: (error) => console.error('Error creating resume:', error),
  });

  const handleStep1Submit = (data: ResumeJson) => {
    setFormData(data);
    setCurrentStep(2);
  };

  const handleLoadDefaultResume = () => {
    if (user?.defaultResumeJson) {
      const defaultResume = user.defaultResumeJson as ResumeJson;
      formRef.current?.reset(defaultResume);
      setFormData(defaultResume);
    }
  };

  const handleStep3Submit = () => {
    if (formRef.current) {
      const formData = formRef.current.getValues();
      createResumeMutation.mutate({
        title: 'New Resume',
        resumeJson: formData,
        templateId: selectedTemplateId,
      });
    }
  };

  const SelectedTemplateComponent = templates.find((t) => t.id === selectedTemplateId)?.component;

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container className="py-6">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Create New Resume"
          description="Follow these steps to create your perfect resume"
        />
        <Tabs value={currentStep.toString()} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="1">Step 1: Basic Info</TabsTrigger>
            <TabsTrigger value="2">Step 2: Choose Template</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className={currentStep === 1 ? '' : 'hidden'} forceMount>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={handleLoadDefaultResume}
                    disabled={!user?.defaultResumeJson}
                  >
                    Load Default Resume
                  </Button>
                </div>
                <ResumeForm
                  ref={formRef}
                  onSubmit={handleStep1Submit}
                  onChange={(data) => setFormData(data)}
                  defaultValues={user?.defaultResumeJson as ResumeJson}
                />
                <div className="flex justify-end">
                  <Button type="submit" form="resume-form">
                    Next: Choose Template
                  </Button>
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Default Template Preview</h3>
                <Card className="h-full">
                  <CardContent className="p-4 resume-preview">
                    {formData ? (
                      <DefaultTemplate data={formData} />
                    ) : (
                      <div className="text-muted-foreground">No preview available</div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="2" className={currentStep === 2 ? '' : 'hidden'} forceMount>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Choose a Template</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {templates.map((template) => (
                      <Card
                        key={template.id}
                        className={`overflow-hidden cursor-pointer hover:border-primary transition-colors ${selectedTemplateId === template.id ? 'border-primary' : ''}`}
                        onClick={() => setSelectedTemplateId(template.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{template.name}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <Card className="h-full">
                    <CardContent className="p-4 resume-preview">
                      {formData && SelectedTemplateComponent ? (
                        <SelectedTemplateComponent data={formData} />
                      ) : (
                        <div className="text-muted-foreground">Select a template to preview</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back: Basic Info
                </Button>
                <Button onClick={handleStep3Submit} disabled={!selectedTemplateId}>
                  Create Resume
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
