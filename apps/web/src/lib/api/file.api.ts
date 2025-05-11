import { api } from './ky';
import { GeneratePdfRequest, GeneratePdfResponse } from '@ai-resume/types';

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
