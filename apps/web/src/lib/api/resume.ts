import {
  CreateResumePayload,
  CreateResumeResponse,
  ResumeDetail,
  ResumeItem,
} from '@ai-resume/types';
import { api } from './ky';

/**
 * Fetch the resume
 */
export const fetchResume = async (id: string): Promise<ResumeDetail> => {
  return api.get(`api/resumes/${id}`).json();
};

/**
 * Fetch the resumes of the current user
 */
export const fetchResumes = async (): Promise<ResumeItem[]> => {
  return api.get('api/resumes').json();
};

/**
 * Fetch the detail of the resume
 */
export const fetchResumeDetail = async (id: string): Promise<ResumeDetail> => {
  return api.get(`api/resumes/${id}`).json();
};

/**
 * Create a new resume
 */
export async function createResume(data: CreateResumePayload): Promise<CreateResumeResponse> {
  return api.post('api/resumes', { json: data }).json();
}
