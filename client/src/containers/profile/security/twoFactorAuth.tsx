'use client';

import { ChangeEvent, memo, useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useAuth } from '@/providers/authProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePopup } from '@/providers/popupProvider';
import { updateUser } from '@/services/user';
import { User } from '@libs/types/user.type';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { generate2faSecret } from '@/services/auth';
import { POPUP_TYPES } from '@/common/constants/popup';
import { getErrorMessage } from '@/utils/getErrorMessage';

export const TwoFactorAuth = memo(() => {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { openPopup } = usePopup();
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false)

  const updateMutation = useMutation({
    mutationFn: ({ isTwoFactorEnabled }: { isTwoFactorEnabled: boolean }) => updateUser(user!.id, { isTwoFactorEnabled }),
    onSuccess: (updatedUser: User) => {
      toast({ title: 'Profile updated', status: 'success' });
      // Update React Query cache
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      setIsTwoFactorEnabled(updatedUser.isTwoFactorEnabled);
    },
    onError: () => {
      toast({ title: 'Update failed', status: 'error' });
    },
  });

  const generateMutation = useMutation({
    mutationFn: generate2faSecret,
    onSuccess: (data) => {
      openPopup(POPUP_TYPES.QR_FOR_2FA, 'Verify 2FA', {
        data: data.qrCodeUrl,
        onVerified: () => {
          updateMutation.mutate({ isTwoFactorEnabled: true });
        },
      });
    },
    onError: (error) => {
      toast({ title: getErrorMessage(error), status: 'error' });
    },
  });

  const onChange = () => {
    setIsTwoFactorEnabled(prevState => !prevState)
  }

  // const onSubmit = (data: FormData) => {
  //   const changedData = getDirtyValues(dirtyFields, data);
  //
  //   if (Object.keys(changedData).length > 0) {
  //     if (Object.hasOwn(changedData, 'isTwoFactorEnabled')) {
  //       if (changedData.isTwoFactorEnabled) {
  //         return generateMutation.mutate();
  //       } else {
  //         return openPopup(POPUP_TYPES.DISABLE_2FA, '');
  //       }
  //     }
  //
  //     updateMutation.mutate(changedData);
  //   }
  // };

  useEffect(() => {
    if (user) {
      setIsTwoFactorEnabled(user.isTwoFactorEnabled);
    }
  }, [user]);

  return (
    <VStack spacing={4} alignItems="start" w="full">
      <Heading mb={4} fontSize="2.2rem" fontWeight={500}>
        Two factor authentication
      </Heading>
        <Box>
          <FormControl display="flex" alignItems="center" gap={4}>
            <Switch
              size="lg"
              id="two-factor"
              isChecked={isTwoFactorEnabled}
              onChange={onChange}
            />
            <FormLabel
              htmlFor="two-factor"
              mb="0"
              fontSize="1.4rem"
              fontWeight={400}
              cursor="pointer"
            >
              {isTwoFactorEnabled ? 'Disable' : 'Enable'} 2fa
            </FormLabel>
          </FormControl>
        </Box>
    </VStack>
  );
});
