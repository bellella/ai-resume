import { User } from '@ai-resume/db';
import { api } from './ky';
import { ApiResponse, UserInfo, ResumeJson } from '@ai-resume/types';

/**
 * Fetch the profile of the current user
 */
export const fetchUserInfo = async (): Promise<UserInfo> => {
  return api.get('api/users/me').json();
};

export const updateUserInfo = async (data: UserInfo): Promise<UserInfo> => {
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
  defaultResumeJson: ResumeJson
): Promise<ApiResponse<ResumeJson>> => {
  return await api
    .patch('api/resumes/default', {
      json: { defaultResumeJson },
    })
    .json();
};

/**
 * Update the profile image of the current user
 */
export const updateUserImage = async (formData: FormData): Promise<ApiResponse<string>> => {
  return await api
    .patch('api/users/me/image', {
      body: formData,
    })
    .json();
};
