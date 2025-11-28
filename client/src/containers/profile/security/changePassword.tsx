'use client';

import { memo } from 'react';
import {
  Box, Button, Flex,
  FormControl,
  FormLabel,
  Heading,
  Switch,
  Text, useToast,
  VStack,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { ChangePasswordSchema } from '@/utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '@libs/types/user.type';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import { updateUser } from '@/services/user';
import { useAuth } from '@/providers/authProvider';

type FormData = yup.InferType<typeof ChangePasswordSchema>;
export const ChangePassword = memo(() => {
  const { user } = useAuth();
  const toast = useToast();
  const queryClient = useQueryClient();

  const methods = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty, dirtyFields },
  } = methods;

  const updateMutation = useMutation({
    mutationFn: (data: Partial<FormData>) => updateUser(user!.id, data),
    onSuccess: (updatedUser: User) => {
      toast({ title: 'Profile updated', status: 'success' });
      // Update React Query cache
      queryClient.setQueryData(QUERY_FACTORY.me, updatedUser);
      reset({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    },
    onError: () => {
      toast({ title: 'Update failed', status: 'error' });
    },
  });

  return (
    <VStack spacing={4} alignItems="start" w="full">
      <Heading mb={4} fontSize="2.2rem" fontWeight={500}>
        Two factor authentication
      </Heading>
      <Controller
        name="isTwoFactorEnabled"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Box>
            <FormControl display="flex" alignItems="center" gap={4}>
              <Switch
                size="lg"
                id="two-factor"
                ref={ref}
                isChecked={!!value}
                onChange={onChange}
              />
              <FormLabel
                htmlFor="two-factor"
                mb="0"
                fontSize="1.4rem"
                fontWeight={400}
                cursor="pointer"
              >
                {value ? 'Disable' : 'Enable'} 2fa
              </FormLabel>
            </FormControl>
            <ErrorMessage
              errors={errors}
              name="isTwoFactorEnabled"
              render={({ message }) => (
                <Text w="full" color="red.300" fontSize="1.3rem">
                  {message}
                </Text>
              )}
            />
          </Box>
        )}
      />
      <Flex justify="flex-end" w="full">
        {/*<Button*/}
        {/*  onClick={handleSubmit(onSubmit)}*/}
        {/*  isDisabled={!isDirty}*/}
        {/*  isLoading={updateMutation.isPending || generateMutation.isPending}*/}
        {/*  variant="primary"*/}
        {/*>*/}
        {/*  Save Changes*/}
        {/*</Button>*/}
      </Flex>
    </VStack>
  );
});
