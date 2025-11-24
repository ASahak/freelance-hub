'use client';

import { memo, useEffect } from 'react';
import { TwoFactorAuth } from './twoFactorAuth';
import { useAuth } from '@/providers/authProvider';
import { Box, Button, Flex, useToast } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@libs/types/user.type';
import { updateUser } from '@/services/user';
import { getDirtyValues } from '@/utils/helpers/global';

type SecurityInputs = {
  isTwoFactorEnabled: boolean;
};

export const SecurityForm = memo(() => {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<SecurityInputs>({
    defaultValues: {
      isTwoFactorEnabled: false,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
  } = methods;

  useEffect(() => {
    if (user) {
      reset({
        isTwoFactorEnabled: user.isTwoFactorEnabled,
      });
    }
  }, [user]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Partial<SecurityInputs>) => updateUser(user!.id, data),
    onSuccess: (updatedUser: User) => {
      toast({ title: 'Profile updated', status: 'success' });
      // Update React Query cache
      queryClient.setQueryData(['user', 'me'], updatedUser);
      reset({
        isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      });
    },
    onError: () => {
      toast({ title: 'Update failed', status: 'error' });
    },
  });

  const onSubmit = (data: SecurityInputs) => {
    const changedData = getDirtyValues(dirtyFields, data);

    if (Object.keys(changedData).length > 0) {
      mutate(changedData);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box flex={1} w="full">
        <TwoFactorAuth />
      </Box>
      <Flex justify="flex-end" w="full">
        <Button
          onClick={handleSubmit(onSubmit)}
          isDisabled={!isDirty}
          isLoading={isPending}
          variant="primary"
        >
          Save Changes
        </Button>
      </Flex>
    </FormProvider>
  );
});
