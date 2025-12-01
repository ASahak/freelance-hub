'use client';

import { memo, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ChangePasswordSchema } from '@/utils/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { changePassword } from '@/services/auth';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

type FormData = yup.InferType<typeof ChangePasswordSchema>;
export const ChangePassword = memo(() => {
  const toast = useToast();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

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
    formState: { errors, isDirty },
  } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: 'Password Changed',
        description: 'Your password has been updated successfully.',
        status: 'success',
      });
      reset({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to change password',
        description: getErrorMessage(error),
        status: 'error',
      });
    },
  });

  const onSubmit = (data: any) => {
    mutate({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  return (
    <VStack spacing={8} alignItems="start" w="full">
      <Heading mb={4} fontSize="2.2rem" fontWeight={500}>
        Change password
      </Heading>
      <FormControl>
        <FormLabel htmlFor="password" fontSize="1.4rem">
          Current Password
        </FormLabel>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                left={2}
                bottom={0}
                m="auto"
              >
                <Icon as={FaLock} color="gray.400" fontSize="1.6rem" />
              </InputLeftElement>
              <Input
                id="password"
                variant="base"
                pl={14}
                type={showCurrent ? 'text' : 'password'}
                placeholder="Current password"
                {...field}
              />
              <InputRightElement right={2} bottom={0} m="auto">
                <Button
                  variant="unstyled"
                  size="lg"
                  display="flex"
                  h="fit-content"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  <Icon
                    as={showCurrent ? FaEyeSlash : FaEye}
                    color="gray.500"
                  />
                </Button>
              </InputRightElement>
            </InputGroup>
          )}
        />
        <ErrorMessage
          errors={errors}
          name="currentPassword"
          render={({ message }) => (
            <Text w="full" color="red.300" fontSize="1.3rem">
              {message}
            </Text>
          )}
        />
      </FormControl>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
        <FormControl>
          <FormLabel htmlFor="newPassword" fontSize="1.4rem">
            New Password
          </FormLabel>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  left={2}
                  bottom={0}
                  m="auto"
                >
                  <Icon as={FaLock} color="gray.400" fontSize="1.6rem" />
                </InputLeftElement>
                <Input
                  id="newPassword"
                  variant="base"
                  pl={14}
                  type={showNew ? 'text' : 'password'}
                  placeholder="Create a password"
                  {...field}
                />
                <InputRightElement right={2} bottom={0} m="auto">
                  <Button
                    variant="unstyled"
                    size="lg"
                    display="flex"
                    h="fit-content"
                    onClick={() => setShowNew(!showNew)}
                  >
                    <Icon as={showNew ? FaEyeSlash : FaEye} color="gray.500" />
                  </Button>
                </InputRightElement>
              </InputGroup>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="newPassword"
            render={({ message }) => (
              <Text w="full" color="red.300" fontSize="1.3rem">
                {message}
              </Text>
            )}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="confirmPassword" fontSize="1.4rem">
            Confirm new Password
          </FormLabel>
          <Controller
            name="confirmNewPassword"
            control={control}
            render={({ field }) => (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  left={2}
                  bottom={0}
                  m="auto"
                >
                  <Icon as={FaLock} color="gray.400" fontSize="1.6rem" />
                </InputLeftElement>
                <Input
                  id="confirmPassword"
                  variant="base"
                  pl={14}
                  type={'password'}
                  placeholder="Confirm password"
                  {...field}
                />
              </InputGroup>
            )}
          />
          <ErrorMessage
            errors={errors}
            name="confirmNewPassword"
            render={({ message }) => (
              <Text w="full" color="red.300" fontSize="1.3rem">
                {message}
              </Text>
            )}
          />
        </FormControl>
      </SimpleGrid>

      <Flex justify="flex-end" w="full">
        <Button
          onClick={handleSubmit(onSubmit)}
          isDisabled={!isDirty}
          isLoading={isPending}
          variant="primary"
        >
          Change Password
        </Button>
      </Flex>
    </VStack>
  );
});
