'use client';

import { memo } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
  Badge,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UAParser } from 'ua-parser-js';
import {
  FaDesktop,
  FaMobileAlt,
  FaTabletAlt,
  FaTrashAlt,
} from 'react-icons/fa';
import { getActiveSessions, revokeSession } from '@/services/auth';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { useAuth } from '@/providers/authProvider';
import Skeleton, { DIRECTION } from 'react-skeleton-builder';
import type { Session as ISession } from '@libs/types/session.type';
import { usePopup } from '@/providers/popupProvider';
import { POPUP_TYPES } from '@/common/constants/popup';

const getDeviceIcon = (type?: string) => {
  switch (type) {
    case 'mobile':
      return FaMobileAlt;
    case 'tablet':
      return FaTabletAlt;
    case 'desktop':
      return FaDesktop;
    default:
      return FaDesktop;
  }
};

const Session = memo(({ data, userId }: { data: ISession; userId: string }) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { openPopup, onClose } = usePopup();

  const parser = new UAParser(data.userAgent);
  const browser = parser.getBrowser();
  const os = parser.getOS();
  const device = parser.getDevice();

  const DeviceIcon = getDeviceIcon(device.type);
  const deviceName = `${browser.name || 'Unknown Browser'} on ${os.name || 'Unknown OS'}`;
  const lastActiveFormatted = dayjs(data.lastActive).format(
    'DD MMMM YYYY HH:mm',
  );

  const revokeMutation = useMutation({
    mutationFn: revokeSession,
    onSuccess: async () => {
      toast({ title: 'Session revoked', status: 'success' });
      // Refresh list
      await queryClient.invalidateQueries({
        queryKey: QUERY_FACTORY.activeSessions(userId),
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: 'Failed to revoke session',
        description: getErrorMessage(error),
        status: 'error',
      });
    },
  });

  const handleRevoke = (sessionId: string) => {
    openPopup(POPUP_TYPES.CONFIRM, 'Confirm Revoke', {
      isLoading: revokeMutation.isPending,
      onProceed: () => revokeMutation.mutate(sessionId),
    });
  };

  return (
    <Flex
      key={data.id}
      p={4}
      borderRadius="lg"
      border="1px solid"
      borderColor="gray.120"
      align="center"
      justify="space-between"
      bg="white"
    >
      <Flex gap={4} align="center">
        <Flex
          w="48px"
          h="48px"
          bg="gray.100"
          borderRadius="full"
          align="center"
          justify="center"
          color="gray.600"
        >
          <Icon as={DeviceIcon} fontSize="1.5rem" />
        </Flex>

        <Box>
          <Text fontWeight="600" fontSize="1.6rem">
            {deviceName}
          </Text>
          <Flex gap={3} color="gray.500" fontSize="1.3rem">
            <Text>{data.ipAddress || 'Unknown IP'}</Text>
            <Text>•</Text>
            <Text>Last active: {lastActiveFormatted}</Text>
          </Flex>
        </Box>
      </Flex>

      {!data.isCurrent ? (
        <Button
          variant="danger"
          onClick={() => handleRevoke(data.id)}
          isLoading={
            revokeMutation.isPending && revokeMutation.variables === data.id
          }
          leftIcon={<Icon as={FaTrashAlt} />}
        >
          Revoke
        </Button>
      ) : (
        <Badge variant="pill-success-fill">Current Device</Badge>
      )}
    </Flex>
  );
});

export const ActiveSessions = memo(() => {
  const { user } = useAuth();

  const { data: sessions, isLoading } = useQuery({
    queryKey: QUERY_FACTORY.activeSessions(user?.id || ''),
    queryFn: getActiveSessions,
    enabled: !!user?.id,
  });

  return (
    <VStack spacing={6} alignItems="start" w="full">
      <Box>
        <Heading mb={4} fontSize="2.2rem" fontWeight={500}>
          Active Sessions
        </Heading>
        <Text color="gray.500" fontSize="1.4rem">
          Manage the devices that are currently logged into your account.
        </Text>
      </Box>

      {isLoading ? (
        <Skeleton
          styles={{ width: '100%', height: '100%' }}
          grid={{
            direction: DIRECTION.COLUMN,
            children: [{ skeletons: [{ r: '8px', h: '7rem' }] }],
          }}
        />
      ) : (
        <VStack spacing={4} w="full" align="stretch">
          {sessions?.map((session) => (
            <Session data={session} key={session.id} userId={user?.id || ''} />
          ))}

          {sessions?.length === 0 && (
            <Text color="gray.300" fontSize="1.5rem">
              No active sessions found.
            </Text>
          )}
        </VStack>
      )}
    </VStack>
  );
});
