import { IUser } from '@/common/interfaces/user'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const getMe = async (): Promise<IUser> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Not authenticated')
  }

  return response.json()
}

export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }

  return true
}

export const createUser = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }

  return true
}
