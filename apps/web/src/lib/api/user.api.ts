import {
  FetchUserResponse,
  UpdateDefaultResumeRequest,
  UpdateDefaultResumeResponse,
  UpdatePersonalInfoRequest,
  UpdatePersonalInfoResponse,
} from '@ai-resume/types';
import { api } from './ky';

/**
 * Fetch the profile of the current user
 */
export const fetchUser = async (): Promise<FetchUserResponse> => {
  return api.get('api/users/me').json();
};

/**
 * Update the profile information of the current user
 */
export const updatePersonalInfo = async (
  data: UpdatePersonalInfoRequest
): Promise<UpdatePersonalInfoResponse> => {
  return await api
    .patch('api/users/me', {
      json: data,
    })
    .json();
};

/**
 * Update the default resume information of the current user
 */
export const updateDefaultResume = async (
  data: UpdateDefaultResumeRequest
): Promise<UpdateDefaultResumeResponse> => {
  return await api
    .patch('api/resumes/default', {
      json: data,
    })
    .json();
};
