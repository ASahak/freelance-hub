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

export const loginWith2fa = async (data: {
  userId: string;
  code: string;
}): Promise<IUser> => {
  try {
    const response = await api.post('/auth/2fa/login', data);
    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Verify 2fa failed: ${errorMessage}`);
  }
};

export const generate2faSecret = async (): Promise<{ qrCodeUrl: string }> => {
  try {
    const response = await api.post('/auth/2fa/generate');
    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Generate 2fa failed: ${errorMessage}`);
  }
};

export const verify2fa = async (code: string): Promise<IUser> => {
  try {
    const response = await api.post('/auth/2fa/verify', { code });
    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Verify 2fa failed: ${errorMessage}`);
  }
};

export const disable2fa = async (password: string): Promise<IUser> => {
  try {
    const response = await api.post('/auth/2fa/disable', { password });
    return response.data;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Disable 2fa failed: ${errorMessage}`);
  }
};

export const changePassword = async (data: any): Promise<void> => {
  await api.post('/auth/change-password', data);
};

export const forgotPassword = async (data: { email: string }) => {
  try {
    const { data: res } = await api.post('/auth/forgot-password', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.message || 'Check your email!';
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Forgot password failed: ${errorMessage}`);
  }
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  try {
    return await api.post('/auth/reset-password', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    throw new Error(`Reset password failed: ${errorMessage}`);
  }
};
