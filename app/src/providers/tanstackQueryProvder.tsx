'use client'

import { PropsWithChildren } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { API_REVALIDATION_BASE_TIME } from '@/common/constants/global'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: API_REVALIDATION_BASE_TIME,
      gcTime: API_REVALIDATION_BASE_TIME,
      staleTime: API_REVALIDATION_BASE_TIME
    }
  }
})

export const TanStackQueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
