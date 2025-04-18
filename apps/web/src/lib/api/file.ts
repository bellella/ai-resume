import { api } from './ky';

/**
 * generate pdf from html
 */
export const generatePdf = async (html: string, css: string) => {
  const response = await api
    .post('api/files/generate/pdf', {
      json: { html, css },
    })
    .blob();
  return response;
};
