'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { getProfile } from '@/services/profile';
import { useAuth } from '@/providers/authProvider';
import { Profile } from '@libs/types/profile.type';

interface ProfileContextType {
  profile: Profile | undefined;
  isLoading: boolean;
  isFetched: boolean;
  error: string;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth()

  const {
    data: profile,
    isLoading,
    isFetched,
    error
  } = useQuery({
    queryKey: QUERY_FACTORY.getProfile(user!.id),
    queryFn: () => getProfile(user!.id),
    retry: 0,
    enabled: !!user,
  });

  const _value = useMemo(
    () => ({
      profile,
      isLoading,
      isFetched,
      error: error?.message || ''
    }),
    [profile, isLoading, error, isFetched],
  );

  return <ProfileContext.Provider value={_value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within an ProfileProvider');
  }
  return context;
};
