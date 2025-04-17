'use client';

import { ResumeForm, ResumeFormRef } from '@/components/profile/resume-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { PageHeader } from '@/components/ui/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { createResume } from '@/lib/api/resume';
import { createTemplatePreviews } from '@/lib/api/template';
import { ResumeJson, TemplateWithPreviewHtml } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export function ResumeCreationSteps() {
  const router = useRouter();
  const { isLoading, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateWithPreviewHtml | null>(null);
  const [useAI, setUseAI] = useState(false);
  const formRef = useRef<ResumeFormRef>(null);

  const fetchTemplatesMutation = useMutation({
    mutationFn: (data: ResumeJson) => createTemplatePreviews(data),
    onSuccess: (templates) => {
      setSelectedTemplate(templates[0]);
    },
  });

  const createResumeMutation = useMutation({
    mutationFn: (data: any) => createResume(data),
    onSuccess: (resume) => {
      router.push(`/resume/${resume.id}`);
    },
    onError: (error) => {
      console.error('Error creating resume:', error);
    },
  });

  const handleStep1Submit = (data: ResumeJson) => {
    fetchTemplatesMutation.mutate(data);
    setCurrentStep(2);
  };

  const handleLoadDefaultResume = () => {
    if (user?.defaultResumeJson) {
      const defaultResume = user.defaultResumeJson as unknown as ResumeJson;
      formRef.current?.reset(defaultResume);
    }
  };

  const handleStep2Submit = (template: TemplateWithPreviewHtml) => {
    setSelectedTemplate(template);
  };

  const handleStep3Submit = () => {
    if (formRef.current) {
      const formData = formRef.current.getValues();
      createResumeMutation.mutate({
        title: 'New Resume',
        resumeJson: formData,
        templateId: selectedTemplate?.id,
        useAI,
      });
    } else {
      alert('formRef.current is null');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
            <TabsTrigger value="3">Step 3: AI Options</TabsTrigger>
          </TabsList>

          <TabsContent value="1" className={currentStep === 1 ? "" : "hidden"} forceMount>
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
                defaultValues={user?.defaultResumeJson as unknown as ResumeJson}
              />
              <div className="flex justify-end">
                <Button type="submit" form="resume-form">
                  Next: Choose Template
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="2">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Template List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Choose a Template</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {fetchTemplatesMutation.data?.map((template: TemplateWithPreviewHtml) => (
                      <Card
                        key={template.id}
                        className={`overflow-hidden cursor-pointer hover:border-primary transition-colors ${
                          selectedTemplate?.id === template.id ? 'border-primary' : ''
                        }`}
                        onClick={() => handleStep2Submit(template)}
                      >
                        <div className="h-40 bg-gradient-to-br from-primary/20 to-primary/5 p-4">
                          <div className="h-full w-full bg-card rounded-md p-4">
                            <div className="h-6 w-24 bg-muted rounded mb-2"></div>
                            <div className="h-3 w-full bg-muted rounded mb-1"></div>
                            <div className="h-3 w-3/4 bg-muted rounded mb-3"></div>
                            <div className="h-12 w-full bg-muted rounded mb-2"></div>
                            <div className="h-3 w-1/2 bg-muted rounded"></div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{template.name}</h3>
                              <p className="text-sm text-muted-foreground">Professional</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Preview</h3>
                  <Card className="h-full">
                    <CardContent className="p-4 resume-preview">
                      {selectedTemplate ? (
                        <iframe
                          srcDoc={selectedTemplate.previewHtml}
                          className="w-full h-[500px] border-0"
                          sandbox="allow-same-origin"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                          Select a template to preview
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back: Basic Info
                </Button>
                <Button onClick={() => setCurrentStep(3)} disabled={!selectedTemplate}>
                  Next: AI Options
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="3">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="useAI"
                        checked={useAI}
                        onChange={(e) => setUseAI(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="useAI" className="text-sm font-medium">
                        Use AI to enhance my resume
                      </label>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI enhancement will help improve your resume's content and grammar.
                      <div className="mt-1 font-medium">
                        Estimated cost: {useAI ? '10' : '0'} coins
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  Back: Choose Template
                </Button>
                <Button onClick={handleStep3Submit} disabled={createResumeMutation.isPending}>
                  {createResumeMutation.isPending ? 'Creating...' : 'Create Resume'}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Container>
  );
}
