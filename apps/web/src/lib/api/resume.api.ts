import {
  CreateResumeRequest,
  CreateResumeResponse,
  FetchResumeResponse,
  FetchResumesResponse,
  UpdateResumeRequest,
  UpdateResumeResponse,
} from '@ai-resume/types';
import { api } from './ky';

/**
 * Fetch the resume
 */
export const fetchResume = async (id: string): Promise<FetchResumeResponse> => {
  return api.get(`api/resumes/${id}`).json();
};

/**
 * Fetch the resumes of the current user
 */
export const fetchResumes = async (): Promise<FetchResumesResponse> => {
  return api.get('api/resumes/user').json();
};

/**
 * Create a new resume
 */
export async function createResume(data: CreateResumeRequest): Promise<CreateResumeResponse> {
  return api.post('api/resumes', { json: data }).json();
}

/**
 * Update the resume
 */
export async function updateResume(
  id: string,
  data: UpdateResumeRequest
): Promise<UpdateResumeResponse> {
  return api.patch(`api/resumes/${id}`, { json: data }).json();
}
