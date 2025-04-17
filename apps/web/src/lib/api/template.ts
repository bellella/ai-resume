import { Template, User } from '@ai-resume/db';
import { api } from './ky';
import { ApiResponse, UserInfo, ResumeJson, TemplateWithPreviewHtml } from '@ai-resume/types';

/**
 * Fetch templates
 */
export const fetchTemplates = async (): Promise<Template[]> => {
  return api.get('api/templates').json();
};

/**
 * Fetch templates and preview htmls for the resume info
 */
export const createTemplatePreviews = async (
  resumeJson: ResumeJson
): Promise<TemplateWithPreviewHtml[]> => {
  return api
    .post(`api/templates/previews`, {
      json: { resumeJson },
    })
    .json();
};
