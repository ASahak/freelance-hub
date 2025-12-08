'use client';

import { memo } from 'react';
import { useAuth } from '@/providers/authProvider';
import { VStack } from '@chakra-ui/react';
import { AuthProvider } from '@libs/types/user.type';
import { TwoFactorAuth } from './twoFactorAuth';
import { ChangePassword } from './changePassword';
import { ActiveSessions } from './activeSessions';
import { Tile } from '@/components/ui';

export const SecurityForm = memo(() => {
  const { user } = useAuth();

  return (
    <VStack spacing={10} alignItems="start" w="full" flex={1}>
      <Tile>
        <TwoFactorAuth />
      </Tile>
      <Tile>
        {user?.provider === AuthProvider.native ? <ChangePassword /> : null}
      </Tile>
      <Tile>
        <ActiveSessions />
      </Tile>
    </VStack>
  );
});
