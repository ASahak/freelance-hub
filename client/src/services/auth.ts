import {
  ICreateUser,
  ISignInCredentials,
  IUser,
} from '@/common/interfaces/user';
import api from '@/lib/api';
import { getErrorMessage } from '@/utils/getErrorMessage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMe = async (): Promise<IUser> => {
  try {
    const response = await api.get(`${API_BASE_URL}/auth/me`);

    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Not Authenticated: ${errorMessage}`);
  }
};

export const logoutUser = async () => {
  try {
    await api.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true },
    );

    return true;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Logout failed: ${errorMessage}`);
  }
};

export const createUser = async (data: ICreateUser): Promise<IUser> => {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Create user failed: ${errorMessage}`);
  }
};

export const signIn = async (data: ISignInCredentials): Promise<IUser> => {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Sign in user failed: ${errorMessage}`);
  }
};
