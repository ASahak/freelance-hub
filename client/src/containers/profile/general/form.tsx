'use client';

import * as yup from 'yup';
import { memo, useEffect } from 'react';
import { Button, Flex, useToast, VStack } from '@chakra-ui/react';
import { useAuth } from '@/providers/authProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PublicProfileSchema } from '@/utils/validators';
import { updateUser } from '@/services/user';
import { User } from '@libs/types/user.type';
import { getDirtyValues } from '@/utils/helpers/global';
import { FullName } from './fullName';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';

type FormData = yup.InferType<typeof PublicProfileSchema>;

export const PublicProfileForm = memo(() => {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(PublicProfileSchema),
    defaultValues: {
      name: '',
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
        name: updatedUser.name,
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
        name: user.name,
      });
    }
  }, [user]);

  return (
    <FormProvider {...methods}>
      <VStack spacing={8} alignItems="start" w="full">
        <VStack spacing={8} flex={1} w="full" alignItems="start">
          <FullName />
        </VStack>
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
      </VStack>
    </FormProvider>
  );
});
