import TEMPLATES, { Template, TemplateId, TemplateOptions } from '@/components/templates/templates';
import { AiEvaluationDetail, ResumeJson } from '@ai-resume/types';
import { create } from 'zustand';
import { useAuthStore } from './auth.store';

type ResumeEditorState = {
  resumeJson?: ResumeJson;
  title: string;
  template: Template;
  templateId: TemplateId;
  templateOptions: TemplateOptions;
  evaluation?: AiEvaluationDetail;
  authModalOpen: boolean;

  initializeResumeForm: (json?: ResumeJson) => void;
  setTitle: (title: string) => void;
  setTemplateId: (id: TemplateId) => void;
  setTemplateOptions: (opts: TemplateOptions) => void;
  setEvaluation: (evaluation?: AiEvaluationDetail) => void;
  setAuthModalOpen: (open: boolean) => void;
  setTemplate: (template: Template) => void;
  requireAuth: () => boolean;
};

export const useResumeEditorStore = create<ResumeEditorState>((set) => ({
  resumeJson: undefined,
  title: 'New Resume',
  template: TEMPLATES['default'],
  templateId: 'default',
  templateOptions: TEMPLATES['default'].templateOptions,
  evaluation: undefined,
  authModalOpen: false,

  initializeResumeForm: (resumeJson) => set({ resumeJson }),
  setTitle: (title) => set({ title }),
  setTemplateId: (templateId) => {
    set({ templateId });
    set({ template: TEMPLATES[templateId] });
  },
  setTemplateOptions: (templateOptions) => set({ templateOptions }),
  setEvaluation: (evaluation) => set({ evaluation }),
  setAuthModalOpen: (open) => set({ authModalOpen: open }),
  setTemplate: (template) => set({ template }),
  requireAuth: () => {
    const { user } = useAuthStore.getState();
    if (!user) {
      set({ authModalOpen: true });
      return false;
    }
    return true;
  },
}));
