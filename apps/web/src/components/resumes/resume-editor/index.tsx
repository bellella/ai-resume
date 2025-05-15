'use client';

import AuthModal from '@/components/auth/auth-modal';
import { ResumeForm } from '@/components/resumes/resume-form';
import { ActionButtons } from '@/components/ui/action-buttons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeFormValues } from '@/lib/hooks/use-resume-form';
import { evaluateResume } from '@/lib/api/ai.api';
import usePdfDownload from '@/lib/hooks/use-pdf-download';
import { useAuthStore } from '@/lib/store/auth.store';
import { useResumeEditorStore } from '@/lib/store/resume-editor.store';
import { ResumeDetail, ResumeJson, TemplateJson } from '@ai-resume/types';
import { useMutation } from '@tanstack/react-query';
import { Download, Eye, Save } from 'lucide-react';
import { useState } from 'react';
import { FieldErrors, UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import AIEvaluation from './ai-evaluation';
import ResumePreview from './resume-preview';
import StyleSettings from './style-settings';
import TemplateList from './template-list';
export type ResumeEditorProps = {
  resume?: ResumeDetail;
  isSaving?: boolean;
  onSave: (data: ResumeSubmitData) => void;
  resumeForm: UseFormReturn<ResumeFormValues>;
};

export type ResumeSubmitData = {
  title: string;
  resumeJson: ResumeJson;
  templateId: string;
  templateJson: TemplateJson;
};

export default function ResumeEditor({
  resume,
  onSave,
  isSaving = false,
  resumeForm,
}: ResumeEditorProps) {
  const {
    title,
    template,
    templateId,
    templateOptions,
    evaluation,
    authModalOpen,
    setTitle,
    setTemplateOptions,
    setEvaluation,
    setAuthModalOpen,
    requireAuth,
  } = useResumeEditorStore();
  const isEditing = resume?.id;
  const { user, defaultResumeJson } = useAuthStore();
  const [currentTab, setCurrentTab] = useState('1');

  const { downloadPdf, downloadPdfMutation } = usePdfDownload();

  // Evaluate resume with AI
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

  const handleEvaluate = async () => {
    if (!requireAuth()) return;
    try {
      const result = await evaluate();
      setEvaluation(result);
    } catch (e) {
      console.error(e);
    }
  };

  // Load default resume
  const handleLoadDefaultResume = () => {
    if (defaultResumeJson) {
      resumeForm.reset(defaultResumeJson);
    }
  };

  // Download PDF
  const handleDownloadPdf = async () => {
    if (!requireAuth()) return;
    await downloadPdf(templateId);
  };

  // Save resume
  const handleSubmit = () => {
    if (!requireAuth()) return;
    onSave({
      title,
      resumeJson: resumeForm.getValues(),
      templateId,
      templateJson: templateOptions,
    });
  };

  const onInvalid = (errors: FieldErrors<ResumeFormValues>) => {
    toast.error('Please fill in all required fields' + JSON.stringify(errors));
  };

  return (
    <div className="relative bg-gray-100">
      <Container>
        <Form {...resumeForm}>
          <form onSubmit={resumeForm.handleSubmit(handleSubmit, onInvalid)}>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_450px] lg:gap-6">
              <div className="order-2 lg:order-1">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                    {isEditing && (
                      <TabsTrigger className="flex-1" value="3" onClick={() => setCurrentTab('3')}>
                        AI Evaluation
                      </TabsTrigger>
                    )}
                  </TabsList>

                  <TabsContent value="1" className={currentTab === '1' ? '' : 'hidden'} forceMount>
                    <div className="flex flex-col gap-4">
                      <ResumeForm />
                    </div>
                  </TabsContent>

                  <TabsContent value="2" className={currentTab === '2' ? '' : 'hidden'} forceMount>
                    <div className="grid grid-cols-[2fr_1fr] gap-6">
                      <div className="space-y-4">
                        <TemplateList />
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

                  {isEditing && (
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

                <div className="block">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="text-right py-1">
                        <Button
                          type="button"
                          variant="accent"
                          size="responsive"
                          className="border-accent-foreground"
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sm:hidden">Preview Resume</span>
                          <span className="hidden sm:block">Zoom In</span>
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <ResumePreview />
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="hidden lg:block">
                  <ResumePreview />
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
