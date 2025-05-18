import { api } from './ky';
import { GeneratePdfRequest, GeneratePdfResponse, ResumeJson } from '@ai-resume/types';

/**
 * generate pdf from html
 */
export const generatePdf = async (data: GeneratePdfRequest): Promise<GeneratePdfResponse> => {
  const response = await api
    .post('api/files/generate/pdf', {
      json: data,
    })
    .blob();
  return response;
};

/**
 * upload file to s3
 */
export const uploadFile = async (formData: FormData): Promise<{ url: string }> => {
  const response = await api.post('api/files/upload', { body: formData });
  return response.json();
};

/**
 * Upload resume file (pdf/docx) → parse into ResumeJson
 */
export const parseResumeFile = async (formData: FormData): Promise<ResumeJson> => {
  const res = await api.post('api/files/parse-resume', { body: formData, timeout: 100000 });
  return res.json();
};
