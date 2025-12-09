import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { useAuth } from '@/providers/authProvider';
import { useLiveStates } from '@/hooks/useLiveStates';

export const useSSE = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const liveStates = useLiveStates({
    userId: user?.id,
  });

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/events`,
      {
        withCredentials: true,
      },
    );

    eventSource.addEventListener('session_update', () => {
      console.log('Received real-time update: Refreshing sessions...');
      queryClient.invalidateQueries({
        queryKey: QUERY_FACTORY.activeSessions(liveStates.current.userId || ''),
      });
    });

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [queryClient]);
};
