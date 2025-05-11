'use client';

import { ResumeForm } from '@/components/forms/resume-form';
import TEMPLATES, { TemplateId, TemplateOptions } from '@/components/templates/templates';
import { ActionButtons } from '@/components/ui/action-buttons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeFormValues, ResumeJsonFormValues, useResumeForm } from '@/hooks/use-resume-form';
import { evaluateResume } from '@/lib/api/ai.api';
import usePdfDownload from '@/lib/hooks/use-pdf-download';
import { useAuthStore } from '@/lib/store/auth.store';
import { AiEvaluationData, ResumeDetail, ResumeJson, TemplateJson } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';
import { Download, Eye, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import AIEvaluation from './ai-evaluation';
import ResumePreview from './resume-preview';
import StyleSettings from './style-settings';
import TemplateList from './template-list';
import AuthModal from '@/components/auth/auth-modal';
import { PersonalInfoSection } from '@/components/forms/resume-form/personal-info-section';
import { EducationHistorySection } from '@/components/forms/resume-form/education-history-section';
import { SummarySection } from '@/components/forms/resume-form/summary-section';
import { SkillsSection } from '@/components/forms/resume-form/skills-section';
import { WorkHistorySection } from '@/components/forms/resume-form/work-history-section';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export type ResumeEditorProps = {
  resume?: ResumeDetail;
  isSaving?: boolean;
  onSave: (data: ResumeSubmitData) => void;
};

export type ResumeSubmitData = {
  title: string;
  resumeJson: ResumeJsonFormValues;
  templateId: string;
  templateJson: TemplateJson;
};

export default function ResumeEditor({ resume, onSave, isSaving = false }: ResumeEditorProps) {
  const { user } = useAuthStore();
  const isNew = !resume?.id;
  const { resumeJson, templateId, templateJson, aiEvaluation } = resume ?? {};
  const [evaluation, setEvaluation] = useState<AiEvaluationData | null>(aiEvaluation ?? null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(
    (templateId as TemplateId) ?? 'default'
  );
  const [currentTab, setCurrentTab] = useState('1');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const template = TEMPLATES[selectedTemplateId];

  const [templateOptions, setTemplateOptions] = useState<TemplateOptions>(
    (templateJson as TemplateOptions) ?? template.templateOptions
  );

  const form = useResumeForm(resumeJson);

  const { downloadPdf, downloadPdfMutation } = usePdfDownload();

  const { mutateAsync: evaluate, isPending: isEvaluating } = useMutation({
    mutationFn: async () => {
      if (!resume?.id) throw new Error('Resume ID missing');
      return await evaluateResume(resume.id);
    },
    onSuccess: (evaluation) => {
      setEvaluation(evaluation);
      toast.success('Resume evaluated successfully');
    },
    onError: (err) => {
      toast.error('Failed to evaluate resume');
    },
  });

  const handleLoadDefaultResume = () => {
    if (user?.defaultResumeJson) {
      const defaultResume = user.defaultResumeJson as ResumeJson;
      const current = form.getValues();
      form.reset({
        ...defaultResume,
        title: current.title,
      });
    }
  };

  const handleEvaluate = async () => {
    if (!requireAuth()) return;
    try {
      const result = await evaluate();
      setEvaluation(result);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownloadPdf = async () => {
    if (!requireAuth()) return;
    await downloadPdf(selectedTemplateId as TemplateId);
  };

  const handleSubmit = (data: ResumeFormValues) => {
    if (!requireAuth()) return;
    const { title, ...resumeJson } = data;
    onSave({
      title,
      resumeJson,
      templateId: selectedTemplateId,
      templateJson: templateOptions,
    });
  };
  // if user is not logged in, open the auth modal
  const requireAuth = () => {
    if (!user) {
      setAuthModalOpen(true);
      return false;
    }
    return true;
  };

  return (
    <div className="relative bg-gray-100">
      <Container>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_450px] lg:gap-6">
              <div className="order-2 lg:order-1">
                <Input
                  {...form.register('title')}
                  placeholder="Enter Resume Title"
                  className="block my-3 w-full bg-white"
                />

                <Tabs value={currentTab} className="w-full">
                  <TabsList className="flex">
                    <TabsTrigger className="flex-1" value="1" onClick={() => setCurrentTab('1')}>
                      Content
                    </TabsTrigger>
                    <TabsTrigger className="flex-1" value="2" onClick={() => setCurrentTab('2')}>
                      Design
                    </TabsTrigger>
                    {!isNew && (
                      <TabsTrigger className="flex-1" value="3" onClick={() => setCurrentTab('3')}>
                        AI Evaluation
                      </TabsTrigger>
                    )}
                  </TabsList>

                  {/* Content Tab */}
                  <TabsContent value="1" className={currentTab === '1' ? '' : 'hidden'} forceMount>
                    <div className="flex flex-col gap-4">
                      <PersonalInfoSection />
                      <WorkHistorySection requireAuth={requireAuth} />
                      <EducationHistorySection />
                      <SkillsSection />
                      <SummarySection />
                    </div>
                  </TabsContent>

                  {/* Design Tab */}
                  <TabsContent value="2" className={currentTab === '2' ? '' : 'hidden'} forceMount>
                    <div className="grid grid-cols-[2fr_1fr] gap-6">
                      <div className="space-y-4">
                        <TemplateList
                          selectedTemplateId={selectedTemplateId}
                          setSelectedTemplateId={setSelectedTemplateId}
                        />
                      </div>
                      <div>
                        <StyleSettings
                          template={template}
                          templateJson={templateOptions}
                          onStyleChange={setTemplateOptions}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* AI Evaluation Tab */}
                  {!isNew && (
                    <TabsContent
                      value="3"
                      className={currentTab === '3' ? '' : 'hidden'}
                      forceMount
                    >
                      <AIEvaluation
                        evaluation={evaluation}
                        onEvaluate={handleEvaluate}
                        isEvaluating={isEvaluating}
                      />
                    </TabsContent>
                  )}
                </Tabs>
              </div>

              <div className="sticky top-4 lg:h-0 order-1 lg:order-2">
                <div className="flex justify-end gap-3 py-3">
                  <ActionButtons>
                    <Button
                      variant="secondary"
                      type="button"
                      size="responsive"
                      onClick={handleLoadDefaultResume}
                      disabled={!user?.defaultResumeJson}
                    >
                      Load Default Profile
                    </Button>
                    <Button
                      variant="secondary"
                      size="responsive"
                      type="button"
                      className="gap-1"
                      onClick={handleDownloadPdf}
                      disabled={downloadPdfMutation.isPending}
                    >
                      <Download className="h-4 w-4" />
                      Export PDF
                    </Button>
                    <Button type="submit" size="responsive" className="gap-1" disabled={isSaving}>
                      <Save className="h-4 w-4" />
                      Save
                    </Button>
                  </ActionButtons>
                </div>
                <div className="block lg:hidden">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="text-right py-1">
                        <Button
                          type="button"
                          variant="accent"
                          size="responsive"
                          className=" border-accent-foreground"
                        >
                          <Eye className="h-4 w-4" />
                          Preview Resume
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <ResumePreview
                        resumeJson={form.watch()}
                        template={template}
                        templateOptions={templateOptions}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="hidden lg:block">
                  <ResumePreview
                    resumeJson={form.watch()}
                    template={template}
                    templateOptions={templateOptions}
                  />
                </div>
              </div>
            </div>
          </form>
        </Form>
      </Container>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}
