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
import { Location } from './location';
import { Rate } from './rate';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { Tile } from '@/components/ui';
import { updateProfile } from '@/services/profile';
import { Profile, Gender as GenderEnum } from '@libs/types/profile.type';
import { useLiveStates } from '@/hooks';
import { useProfile } from '@/providers/profileProvider';
import { Gender } from './gender';

type FormData = yup.InferType<typeof PublicProfileSchema>;

export const PublicProfileForm = memo(() => {
  const { user } = useAuth();
  const {
    profile,
    isLoading: isProfileLoading,
    isFetched: isProfileFetched,
  } = useProfile();

  const toast = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(PublicProfileSchema),
    defaultValues: {
      name: '',
      city: '',
      country: '',
      hourlyRate: '',
      gender: null,
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
    mutationFn: ({
      name,
      country,
      city,
      hourlyRate,
      gender,
    }: Partial<FormData>) => {
      return Promise.all([
        updateUser(user!.id, { name }),
        updateProfile(user!.id, {
          country,
          city,
          hourlyRate: Number(hourlyRate),
          gender: gender as GenderEnum,
        }),
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
        city: updatedProfile.city || '',
        hourlyRate: updatedProfile.hourlyRate?.toString() || '',
        gender: updatedProfile.gender || null,
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
    if (profile && isProfileFetched) {
      reset({
        ...liveStates.current.values,
        country: profile.country || '',
        city: profile.city || '',
        hourlyRate: profile.hourlyRate?.toString() || '',
        gender: profile.gender || null,
      });
    }
  }, [profile, isProfileFetched]);

  return (
    <FormProvider {...methods}>
      <VStack spacing={8} alignItems="start" w="full">
        <Tile flex={1} w="full" display="flex" flexDir="column">
          <VStack spacing={8} w="full" alignItems="start" flex={1}>
            <FullName />
            <Location isLoading={isProfileLoading} />
            <Rate />
            <Gender isLoading={isProfileLoading} />
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
