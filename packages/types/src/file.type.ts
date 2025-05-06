/**
 * Request for generating a PDF from HTML content
 */
export interface GeneratePdfRequest {
  html: string;
}

/**
 * Response for generated PDF
 */
export type GeneratePdfResponse = Blob;
