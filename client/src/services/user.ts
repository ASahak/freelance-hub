import api from '@/lib/api';
import { User } from '@libs/types/user.type';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/users/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const updateUser = async (
  userId: string,
  data: Partial<User>,
): Promise<User> => {
  try {
    const response = await api.patch(
      `/users/${userId}`,
      {
        data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Update failed: ${errorMessage}`);
  }
};

export const removeAvatar = async (): Promise<User> => {
  const response = await api.delete('/users/avatar');
  return response.data;
};
