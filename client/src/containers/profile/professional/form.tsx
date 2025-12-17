'use client';

import * as yup from 'yup';
import { memo, useEffect } from 'react';
import { Button, Flex, useToast, VStack } from '@chakra-ui/react';
import { useAuth } from '@/providers/authProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfessionalSchema } from '@/utils/validators';
import { getDirtyValues } from '@/utils/helpers/global';
import { Headline } from './headline';
import { Bio } from './bio';
import { Skills } from './skills';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { Tile } from '@/components/ui';
import { updateProfile } from '@/services/profile';
import { Profile } from '@libs/types/profile.type';
import { useLiveStates } from '@/hooks';
import { useProfile } from '@/providers/profileProvider';

type FormData = yup.InferType<typeof ProfessionalSchema>;

export const ProfessionalForm = memo(() => {
  const { user } = useAuth();
  const { profile, isFetched: isProfileFetched } = useProfile();

  const toast = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(ProfessionalSchema),
    defaultValues: {
      headline: '',
      bio: '',
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
    mutationFn: ({ headline, bio }: Partial<FormData>) => updateProfile(
      user!.id,
      { headline, bio }
    ),
    onSuccess: (updatedProfile: Profile) => {
      toast({ title: 'Profile updated', status: 'success' });
      // Update React Query cache
      queryClient.setQueryData(
        QUERY_FACTORY.getProfile(user!.id),
        updatedProfile,
      );
      reset({
        headline: updatedProfile.headline || '',
        bio: updatedProfile.bio || '',
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
    if (profile && isProfileFetched) {
      reset({
        ...liveStates.current.values,
        headline: profile.headline || '',
        bio: profile.bio || '',
      });
    }
  }, [profile, isProfileFetched]);

  return (
    <FormProvider {...methods}>
      <VStack spacing={8} alignItems="start" w="full">
        <Tile flex={1} w="full" display="flex" flexDir="column">
          <VStack spacing={8} w="full" alignItems="start" flex={1}>
            <Headline />
            <Bio />
            <Skills />
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
