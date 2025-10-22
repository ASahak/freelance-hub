import {
  ICreateUser,
  ISignInCredentials,
  IUser,
} from '@/common/interfaces/user';
import { getErrorMessage } from '@/utils/getErrorMessage';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMe = async (): Promise<IUser> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = getErrorMessage(errorData);
    throw new Error(`Not authenticated: ${errorMessage}`);
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = getErrorMessage(errorData);
    throw new Error(`Logout failed: ${errorMessage}`);
  }

  return true;
};

export const createUser = async (data: ICreateUser): Promise<IUser> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData);
    const errorMessage = getErrorMessage(errorData);
    throw new Error(`Create user failed: ${errorMessage}`);
  }

  return response.json();
};

export const signIn = async (data: ISignInCredentials): Promise<IUser> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error:', errorData);
    const errorMessage = getErrorMessage(errorData);
    throw new Error(`Sign in user failed: ${errorMessage}`);
  }

  return response.json();
};
