import { Profile } from '@libs/types/profile.type';
import api from '@/lib/api';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const getProfile = async (userId: string): Promise<Profile> => {
  try {
    const response = await api.get(`/users/${userId}/profile`);

    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Failed to fetch profile: ${errorMessage}`);
  }
};

export const updateProfile = async (
  userId: string,
  data: Partial<Omit<Profile, 'skills'> & { skills: string[] }>,
): Promise<Profile> => {
  try {
    const response = await api.patch(`/users/${userId}/profile`, data);

    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Failed to update profile: ${errorMessage}`);
  }
};
