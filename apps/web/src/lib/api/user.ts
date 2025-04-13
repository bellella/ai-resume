import { User } from '@ai-resume/db';
import { api } from './ky';
import { ApiResponse, PersonalInfo, ResumeJson } from '@ai-resume/types';

/**
 * Fetch the profile of the current user
 */
export const fetchPersonalInfo = async (): Promise<ApiResponse<PersonalInfo>> => {
  return await api.get('users/personal-info').json();
};

export const updatePersonalInfo = async (
  data: PersonalInfo
): Promise<ApiResponse<PersonalInfo>> => {
  return await api
    .patch('users/personal-info', {
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
    .patch('users/me/resume', {
      json: { defaultResumeJson },
    })
    .json();
};

/**
 * Update the profile image of the current user
 */
export const updateUserImage = async (formData: FormData): Promise<ApiResponse<string>> => {
  return await api
    .patch('users/me/image', {
      body: formData,
    })
    .json();
};

export const fetchUser = async (): Promise<ApiResponse<any>> => {
  return api.get('user').json();
};
