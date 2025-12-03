'use client';

import NextLink from 'next/link';
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
} from '@chakra-ui/react';
import { FaEnvelope } from 'react-icons/fa';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Logo } from '@/components/ui';
import { ROUTES } from '@/common/constants/routes';
import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '@/services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForgotPasswordSchema } from '@/utils/validators';
import * as yup from 'yup';

type FormData = yup.InferType<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: 'onSubmit',
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const toast = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (message: string) => {
      toast({
        title: message,
        status: 'success',
      });
      reset({ email: '' });
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: 'error',
      });
    },
  });

  const onSubmit = ({ email }: FormData) =>
    mutate({
      email,
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
                  <FormLabel htmlFor="email" fontSize="1.4rem">
                    Email
                  </FormLabel>
                  <Controller
                    name="email"
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
                            as={FaEnvelope}
                            color="gray.400"
                            fontSize="1.6rem"
                          />
                        </InputLeftElement>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          variant="base"
                          pl={14}
                          {...field}
                        />
                      </InputGroup>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
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
                  Send Email
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

export default ForgotPassword;
