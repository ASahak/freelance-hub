import { ICreateUser, ISignInCredentials } from '@/common/interfaces/user';
import { User as IUser } from '@libs/types/user.type';
import api from '@/lib/api';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const getMe = async (): Promise<IUser> => {
  try {
    const response = await api.get('/auth/me');

    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Not Authenticated: ${errorMessage}`);
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout', {}, { withCredentials: true });

    return true;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Logout failed: ${errorMessage}`);
  }
};

export const createUser = async (data: ICreateUser): Promise<IUser> => {
  try {
    const response = await api.post('/auth/register', data, {
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
    const response = await api.post('/auth/login', data, {
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
