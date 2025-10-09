'use client'

import { createContext, useContext, ReactNode, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMe, logoutUser } from '@/services/auth'
import { QUERY_FACTORY } from '@/common/constants/queryFactory'
import { IUser } from '@/common/interfaces/user'
import { useToast } from '@chakra-ui/react'

interface AuthContextType {
  user: IUser | undefined
  isLoading: boolean
  isAuthenticated: boolean
  isLoggingOut: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: QUERY_FACTORY.me,
    queryFn: getMe,
    retry: 0,
    gcTime: 0,
    staleTime: 0
  })

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Manually and synchronously remove the user from the cache.
      queryClient.setQueryData(QUERY_FACTORY.me, null)
      // When logout is successful, invalidate the 'user' query.
      // This tells react-query to refetch it, which will fail (as expected),
      // effectively logging the user out on the client.
      queryClient.invalidateQueries({ queryKey: QUERY_FACTORY.me })
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: 'error'
      })
    }
  })

  const isAuthenticated = !!user && !isError

  const _value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated,
      logout,
      isLoggingOut: isPending
    }),
    [user, isLoading, isAuthenticated, isPending]
  )

  return <AuthContext.Provider value={_value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
