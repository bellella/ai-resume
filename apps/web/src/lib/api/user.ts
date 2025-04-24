import { ApiResponse, PersonalInfo, ResumeJson, UserInfo } from '@ai-resume/types';
import { api } from './ky';

/**
 * Fetch the profile of the current user
 */
export const fetchUserInfo = async (): Promise<UserInfo> => {
  return api.get('api/users/me').json();
};

export const updateUserInfo = async (data: PersonalInfo): Promise<UserInfo> => {
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
