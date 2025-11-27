'use client';

import * as yup from 'yup';
import { memo, useEffect } from 'react';
import { Box, Button, Flex, useToast, VStack } from '@chakra-ui/react';
import { useAuth } from '@/providers/authProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AccountSchema } from '@/utils/validators';
import { updateUser } from '@/services/user';
import { User } from '@libs/types/user.type';
import { getDirtyValues } from '@/utils/helpers/global';
import { Email } from './email';
import { Role } from './role';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';

type FormData = yup.InferType<typeof AccountSchema>;

export const AccountForm = memo(() => {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(AccountSchema),
    defaultValues: {
      email: '',
      role: undefined,
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields },
  } = methods;

  const updateMutation = useMutation({
    mutationFn: (data: Partial<FormData>) =>
      updateUser(user!.id, data as Partial<User>),
    onSuccess: (updatedUser: User) => {
      toast({ title: 'Profile updated', status: 'success' });
      // Update React Query cache
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      reset({
        email: updatedUser.email,
        role: updatedUser.role as never,
      });
    },
    onError: () => {
      toast({ title: 'Update failed', status: 'error' });
    },
  });

  const onSubmit = (data: FormData) => {
    const changedData = getDirtyValues(dirtyFields, data);

    if (Object.keys(changedData).length > 0) {
      updateMutation.mutate(changedData);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        email: user.email,
        role: user.role as never,
      });
    }
  }, [user]);

  return (
    <VStack spacing={8} alignItems="start" w="full">
      <FormProvider {...methods}>
        <Box flex={1} w="full">
          <VStack spacing={6}>
            <Email />
            <Role />
          </VStack>
        </Box>
        <Flex justify="flex-end" w="full">
          <Button
            onClick={handleSubmit(onSubmit)}
            isDisabled={!isDirty}
            isLoading={updateMutation.isPending}
            variant="primary"
          >
            Save Changes
          </Button>
        </Flex>
      </FormProvider>
    </VStack>
  );
});
