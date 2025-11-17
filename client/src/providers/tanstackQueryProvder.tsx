'use client';

import { ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { API_REVALIDATION_BASE_TIME } from '@/common/constants/global';
import { User } from '@libs/types/user.type';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';

type IProps = { children: ReactNode; initialUser: User | null };
export const TanStackQueryProvider = ({ children, initialUser }: IProps) => {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchInterval: API_REVALIDATION_BASE_TIME,
          gcTime: API_REVALIDATION_BASE_TIME,
          staleTime: API_REVALIDATION_BASE_TIME,
        },
      },
    });
    // If we have an initial user from the server,
    // pre-fill the query cache with that data.
    if (initialUser) {
      client.setQueryData(QUERY_FACTORY.me, initialUser);
    }
    return client;
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
