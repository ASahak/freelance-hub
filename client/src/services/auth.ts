import {
  ICreateUser,
  ISignInCredentials,
  IUser,
} from '@/common/interfaces/user';
import api from '@/lib/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMe = async (): Promise<IUser> => {
  const response = await api.get(`${API_BASE_URL}/auth/me`, {
    headers: {
      'X-No-Refresh': 'true',
    },
  });

  return response.data;
};

export const logoutUser = async () => {
  await api.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });

  return true;
};

export const createUser = async (data: ICreateUser): Promise<IUser> => {
  const response = await api.post(
    `${API_BASE_URL}/auth/register`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    },
    { withCredentials: true },
  );

  return response.data;
};

export const signIn = async (data: ISignInCredentials): Promise<IUser> => {
  const response = await api.post(
    `${API_BASE_URL}/auth/login`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    },
    { withCredentials: true },
  );

  return response.data;
};
