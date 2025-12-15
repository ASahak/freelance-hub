'use client';

import * as yup from 'yup';
import { memo, useEffect } from 'react';
import { Button, Flex, useToast, VStack } from '@chakra-ui/react';
import { useAuth } from '@/providers/authProvider';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PublicProfileSchema } from '@/utils/validators';
import { updateUser } from '@/services/user';
import { User } from '@libs/types/user.type';
import { getDirtyValues } from '@/utils/helpers/global';
import { FullName } from './fullName';
import { Location } from './location';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { Tile } from '@/components/ui';
import { getProfile, updateProfile } from '@/services/profile';
import { Profile } from '@libs/types/profile.type';
import { useLiveStates } from '@/hooks';

type FormData = yup.InferType<typeof PublicProfileSchema>;

export const PublicProfileForm = memo(() => {
  const { user } = useAuth();

  const {
    data: profile,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: QUERY_FACTORY.getProfile(user!.id),
    queryFn: () => getProfile(user!.id),
    retry: 0,
    enabled: !!user,
  });

  const toast = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(PublicProfileSchema),
    defaultValues: {
      name: '',
      city: '',
      country: '',
    },
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isDirty, dirtyFields },
  } = methods;
  const values = watch();

  const liveStates = useLiveStates({
    values,
  });
  const updateMutation = useMutation({
    mutationFn: ({ name, country, city }: Partial<FormData>) => {
      return Promise.all([
        updateUser(user!.id, { name }),
        updateProfile(user!.id, { country, city }),
      ]);
    },
    onSuccess: ([updatedUser, updatedProfile]: [User, Profile]) => {
      toast({ title: 'Profile updated', status: 'success' });
      // Update React Query cache
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      queryClient.setQueryData(
        QUERY_FACTORY.getProfile(user!.id),
        updatedProfile,
      );
      reset({
        name: updatedUser.name,
        country: updatedProfile.country,
        city: updatedProfile.city,
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
        ...liveStates.current.values,
        name: user.name,
      });
    }
  }, [user, profile]);

  useEffect(() => {
    if (profile && isFetched) {
      reset({
        ...liveStates.current.values,
        country: profile.country || '',
        city: profile.city || '',
      });
    }
  }, [profile, isFetched]);

  return (
    <FormProvider {...methods}>
      <VStack spacing={8} alignItems="start" w="full">
        <Tile flex={1} w="full" display="flex" flexDir="column">
          <VStack spacing={8} w="full" alignItems="start" flex={1}>
            <FullName />
            {user ? <Location isLoading={isLoading} /> : null}
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
        </Tile>
      </VStack>
    </FormProvider>
  );
});
