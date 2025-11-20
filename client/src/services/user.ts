import api from '@/lib/api';
import { User } from '@libs/types/user.type';
import { API_BASE_URL } from '@/common/constants/global';

export const uploadAvatar = async (file: File): Promise<User> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post(`${API_BASE_URL}/users/avatar`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const removeAvatar = async (): Promise<User> => {
  const response = await api.delete('/users/avatar');
  return response.data;
};
