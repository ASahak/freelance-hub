import api from '@/lib/api';
import { User } from '@libs/types/user.type';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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