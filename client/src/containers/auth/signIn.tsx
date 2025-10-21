'use client';

import { useState } from 'react';
import NextLink from 'next/link';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Text,
  VStack,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ErrorMessage } from '@hookform/error-message';
import { Logo } from '@/components/ui';
import { ROUTES } from '@/common/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ISignInCredentials, IUser } from '@/common/interfaces/user';
import { signIn } from '@/services/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInSchema } from '@/utils/validators';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: 'onSubmit',
    resolver: yupResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const toast = useToast();
  const router = useRouter();
  const { mutate: onSignInUser, isPending } = useMutation<
    IUser,
    Error,
    ISignInCredentials
  >({
    mutationFn: signIn,
    onSuccess: async () => {
      queryClient.setQueryData(QUERY_FACTORY.me, null);
      await queryClient.invalidateQueries({ queryKey: QUERY_FACTORY.me });
      router.push(ROUTES.HOME);
    },
    onError: (error) => {
      toast({
        title: error.message,
        status: 'error',
      });
    },
  });

  const onSubmit = ({ email, password }: Inputs) =>
    onSignInUser({
      email,
      password,
    });

  const onHandleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/callback/google`;
  };

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
          <Heading as="h1" size="xl" fontWeight="bold">
            Welcome back
          </Heading>
          <Text color="gray.400" display="inline" fontSize="1.4rem">
            Sign in to your FreelanceHub account
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

                <FormControl>
                  <FormLabel htmlFor="password" fontSize="1.4rem">
                    Password
                  </FormLabel>
                  <Controller
                    name="password"
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
                          id="password"
                          variant="base"
                          pl={14}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          {...field}
                        />
                        <InputRightElement right={2} bottom={0} m="auto">
                          <Button
                            variant="unstyled"
                            size="lg"
                            display="flex"
                            h="fit-content"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <Icon
                              as={showPassword ? FaEyeSlash : FaEye}
                              color="gray.500"
                            />
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    )}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <Text w="full" color="red.300" fontSize="1.3rem">
                        {message}
                      </Text>
                    )}
                  />
                </FormControl>

                <Flex w="full" justify="flex-end">
                  <Link
                    as={NextLink}
                    href={ROUTES.FORGOT_PASS}
                    fontSize="1.2rem"
                    color="blue.300"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    Forgot password?
                  </Link>
                </Flex>

                <Button
                  type="submit"
                  w="full"
                  variant="primary"
                  isLoading={isSubmitting || isPending}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Flex w="full" align="center" gap={4}>
              <Divider />
              <Text
                fontSize="1.2rem"
                color="gray.400"
                whiteSpace="nowrap"
                textTransform="uppercase"
              >
                Or continue with
              </Text>
              <Divider />
            </Flex>

            <Button
              variant="popover-btn"
              w="full"
              justifyContent="center"
              gap={3}
              onClick={onHandleGoogleAuth}
            >
              <Icon as={FcGoogle} fontSize="1.6rem" />
              Sign In with Google
            </Button>

            <Text fontSize="1.4rem" color="gray.400">
              Don&apos;t have an account?{' '}
              <Link
                as={NextLink}
                href={ROUTES.SIGN_UP}
                color="blue.300"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                Sign up
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default SignIn;
