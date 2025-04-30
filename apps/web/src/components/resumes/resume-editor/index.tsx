'use client';

import { ResumeForm, ResumeFormRef } from '@/components/profiles/resume-form';
import ResumePreview from '@/components/ResumePreview';
import TEMPLATES, { StyleVars, TemplateId } from '@/components/templates/templates';
import { ActionButtons } from '@/components/ui/action-buttons';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import usePdfDownload from '@/lib/hooks/usePdfDownload';
import { useAuthStore } from '@/lib/store/auth';
import { ResumeDetail, ResumeJson, TemplateJson } from '@ai-resume/types';
import { Download, Save } from 'lucide-react';
import { useRef, useState } from 'react';
import StyleSettings from './style-settings';
import TemplateList from './template-list';
import AIEvaluation from './ai-evaluation';
import { evaluateResume } from '@/lib/api/ai';
import { AiEvaluationData } from '@ai-resume/types';
import { toast } from 'sonner';
import { useMutation, useMutationState } from '@tanstack/react-query';
interface ResumeEditorProps {
  resume?: ResumeDetail;
  isSaving?: boolean;
  onSave: (data: {
    title: string;
    resumeJson: ResumeJson;
    templateId: string;
    templateJson: TemplateJson;
  }) => void;
}

export default function ResumeEditor({ resume, onSave, isSaving = false }: ResumeEditorProps) {
  const { user } = useAuthStore();
  const [title, setTitle] = useState(resume?.title ?? 'New Resume');
  const [evaluation, setEvaluation] = useState<AiEvaluationData | null>(
    resume?.aiEvaluation ?? null
  );
  const [formData, setFormData] = useState<ResumeJson>(
    resume?.resumeJson ?? {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      province: '',
      postalCode: '',
      professionalSummary: '',
      skills: [],
      workExperiences: [],
      educations: [],
    }
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>(
    (resume?.templateId as TemplateId) ?? 'default'
  );
  const template = TEMPLATES[selectedTemplateId];

  const [styleVars, setStyleVars] = useState<StyleVars>(
    (resume?.templateJson as StyleVars) ?? template.styleVars
  );
  const [currentTab, setCurrentTab] = useState('1');
  const formRef = useRef<ResumeFormRef>(null);

  const { handlePdfDownload, downloadPdfMutation } = usePdfDownload();

  const handleLoadDefaultResume = () => {
    if (user?.defaultResumeJson) {
      const defaultResume = user.defaultResumeJson as ResumeJson;
      formRef.current?.reset(defaultResume);
      setFormData(defaultResume);
    }
  };

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
    try {
      const result = await evaluate();
      setEvaluation(result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative bg-gray-100">
      <Container>
        <div className="lg:grid lg:grid-cols-[2fr_450px] gap-6">
          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Resume Title"
              className="block my-3 w-full bg-transparent border-2"
            />

            <Tabs value={currentTab} className="w-full">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="1" onClick={() => setCurrentTab('1')}>
                  Content
                </TabsTrigger>
                <TabsTrigger value="2" onClick={() => setCurrentTab('2')}>
                  Design
                </TabsTrigger>
                {resume?.id && (
                  <TabsTrigger value="3" onClick={() => setCurrentTab('3')}>
                    AI Evaluation
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="1" className={currentTab === '1' ? '' : 'hidden'} forceMount>
                <ResumeForm ref={formRef} onChange={setFormData} defaultValues={formData} />
              </TabsContent>

              <TabsContent value="2" className={currentTab === '2' ? '' : 'hidden'} forceMount>
                <div className="space-y-6">
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
                        templateJson={styleVars}
                        onStyleChange={setStyleVars}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              {resume?.id && (
                <TabsContent value="3" className={currentTab === '3' ? '' : 'hidden'} forceMount>
                  <AIEvaluation
                    evaluation={evaluation}
                    onEvaluate={handleEvaluate}
                    isEvaluating={isEvaluating}
                  />
                </TabsContent>
              )}
            </Tabs>
          </div>

          <div className="sticky top-4 h-0">
            <div className="flex justify-end gap-3 p-3">
              <ActionButtons>
                <Button
                  variant="outline"
                  onClick={handleLoadDefaultResume}
                  disabled={!user?.defaultResumeJson}
                >
                  Load Default Profile
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => handlePdfDownload(selectedTemplateId as TemplateId)}
                  disabled={downloadPdfMutation.isPending}
                >
                  <Download className="h-4 w-4" />
                  Export PDF
                </Button>
                <Button
                  size="sm"
                  className="gap-1"
                  onClick={() =>
                    onSave({
                      title,
                      resumeJson: formData,
                      templateId: selectedTemplateId,
                      templateJson: styleVars,
                    })
                  }
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </ActionButtons>
            </div>
            <ResumePreview formData={formData} template={template} styleVars={styleVars} />
          </div>
        </div>
      </Container>
    </div>
  );
}
