'use client';

import NextLink from 'next/link';
import { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
  VStack,
  useToast,
  InputRightElement,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Logo } from '@/components/ui';
import { ROUTES } from '@/common/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '@/services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResetPasswordSchema } from '@/utils/validators';
import * as yup from 'yup';
import { useSearchParams } from 'next/navigation';

type FormData = yup.InferType<typeof ResetPasswordSchema>;

const ResetPassword = () => {
  const [showNew, setShowNew] = useState(false);
  const searchParams = useSearchParams();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });
  const toast = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast({
        title: 'Check your email!',
        status: 'success',
      });
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: 'error',
      });
    },
  });

  const onSubmit = ({ newPassword }: FormData) =>
    mutate({
      token: searchParams.get('token') || '',
      newPassword,
    });

  return (
    <VStack spacing={8} w="full" maxW="2xl" position="relative" zIndex={1}>
      <Logo />

      <Card
        p={8}
        w="full"
        shadow="lg"
        borderWidth={1}
        rounded="xl"
        borderColor="gray.100"
        bg="white"
      >
        <CardHeader textAlign="center">
          <Text color="gray.400" display="inline" fontSize="1.4rem">
            Reset your password with the mail that you are registered.
          </Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={6}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <VStack spacing={6}>
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
                          <Icon
                            as={FaLock}
                            color="gray.400"
                            fontSize="1.6rem"
                          />
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
                            <Icon
                              as={showNew ? FaEyeSlash : FaEye}
                              color="gray.500"
                            />
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
                          <Icon
                            as={FaLock}
                            color="gray.400"
                            fontSize="1.6rem"
                          />
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

                <Button
                  type="submit"
                  w="full"
                  variant="primary"
                  isLoading={isSubmitting || isPending}
                >
                  Reset
                </Button>
              </VStack>
            </form>

            <Text fontSize="1.4rem" color="gray.400">
              <Link
                as={NextLink}
                href={ROUTES.SIGN_IN}
                color="blue.300"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                Sign In
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default ResetPassword;
