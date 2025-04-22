import { api } from './ky';

/**
 * generate pdf from html
 */
export const generatePdf = async (html: string) => {
  const response = await api
    .post('api/files/generate/pdf', {
      json: { html },
    })
    .blob();
  return response;
};
