'use client';

import * as yup from 'yup';
import { memo, useEffect } from 'react';
import { TwoFactorAuth } from './twoFactorAuth';
import { useAuth } from '@/providers/authProvider';
import { Box, Button, Flex, useToast, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@libs/types/user.type';
import { updateUser } from '@/services/user';
import { getDirtyValues } from '@/utils/helpers/global';
import { usePopup } from '@/providers/popupProvider';
import { POPUP_TYPES } from '@/common/constants/popup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileSecuritySchema } from '@/utils/validators';
import { generate2faSecret } from '@/services/auth';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';

type FormData = yup.InferType<typeof ProfileSecuritySchema>;

export const SecurityForm = memo(() => {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { openPopup } = usePopup();

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(ProfileSecuritySchema),
    defaultValues: {
      isTwoFactorEnabled: false,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
  } = methods;

  const updateMutation = useMutation({
    mutationFn: (data: Partial<FormData>) => updateUser(user!.id, data),
    onSuccess: (updatedUser: User) => {
      toast({ title: 'Profile updated', status: 'success' });
      // Update React Query cache
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      reset({
        isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      });
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

  const onSubmit = (data: FormData) => {
    const changedData = getDirtyValues(dirtyFields, data);

    if (Object.keys(changedData).length > 0) {
      if (Object.hasOwn(changedData, 'isTwoFactorEnabled')) {
        if (changedData.isTwoFactorEnabled) {
          return generateMutation.mutate();
        } else {
          return openPopup(POPUP_TYPES.DISABLE_2FA, '');
        }
      }

      updateMutation.mutate(changedData);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        isTwoFactorEnabled: user.isTwoFactorEnabled,
      });
    }
  }, [user]);

  return (
    <VStack spacing={8} alignItems="start" w="full" flex={1}>
      <FormProvider {...methods}>
        <Box flex={1} w="full">
          <TwoFactorAuth />
        </Box>
        <Flex justify="flex-end" w="full">
          <Button
            onClick={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
            isLoading={updateMutation.isPending || generateMutation.isPending}
            variant="primary"
          >
            Save Changes
          </Button>
        </Flex>
      </FormProvider>
    </VStack>
  );
});
