'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMe, logoutUser } from '@/services/auth'
import { QUERY_FACTORY } from '@/common/constants/queryFactory'
import { User } from '@/common/interfaces/user'

interface AuthContextType {
  user: User | undefined
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: QUERY_FACTORY.me,
    queryFn: getMe,
    retry: false
  })

  const { mutate: logout } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // When logout is successful, invalidate the 'user' query.
      // This tells react-query to refetch it, which will fail (as expected),
      // effectively logging the user out on the client.
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
    }
  })

  const isAuthenticated = !!user && !isError

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
