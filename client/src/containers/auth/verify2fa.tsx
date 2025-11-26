'use client';

import { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  VStack,
  useToast,
  Link,
} from '@chakra-ui/react';
import AuthCode from 'react-auth-code-input';
import { useRouter, useSearchParams } from 'next/navigation';
import { Logo } from '@/components/ui';
import { ROUTES } from '@/common/constants/routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User as IUser } from '@libs/types/user.type';
import { loginWith2fa } from '@/services/auth';
import { QUERY_FACTORY } from '@/common/constants/queryFactory';
import NextLink from 'next/link';

const Verify2fa = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [code, setCode] = useState('');

  // Get userId passed from the Login page
  const userId = searchParams.get('userId');
  const redirectPath = searchParams.get('redirect');

  useEffect(() => {
    if (!userId) {
      router.replace(ROUTES.SIGN_IN);
    }
  }, [userId, router]);

  const { mutate: onVerify, isPending } = useMutation<
    IUser,
    Error,
    { userId: string; code: string }
  >({
    mutationFn: loginWith2fa,
    onSuccess: async (user) => {
      queryClient.setQueryData(QUERY_FACTORY.me, user);
      await queryClient.invalidateQueries({ queryKey: QUERY_FACTORY.me });

      router.push(redirectPath || ROUTES.HOME);
    },
    onError: (error) => {
      toast({
        title: 'Verification Failed',
        description: error.message || 'Invalid code',
        status: 'error',
        duration: 3000,
      });
    },
  });

  const handleOnChange = (res: string) => {
    setCode(res);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userId) {
      onVerify({ userId, code });
    }
  };

  if (!userId) return null;

  return (
    <VStack spacing={8} w="full" maxW="4xl" position="relative" zIndex={1}>
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
          <Heading as="h1" size="xl" fontWeight="bold" mb={2}>
            Two-Factor Authentication
          </Heading>
          <Text color="gray.400" fontSize="1.4rem" textAlign="center">
            Enter the 6-digit code from your authenticator app.
          </Text>
        </CardHeader>

        <CardBody as="form" onSubmit={onSubmit}>
          <VStack spacing={8}>
            <AuthCode
              allowedCharacters="numeric"
              onChange={handleOnChange}
              inputClassName="auth-code-input"
              containerClassName="auth-code-input-container"
            />

            <Button
              type="submit"
              w="full"
              variant="primary"
              isLoading={isPending}
            >
              Verify & Sign In
            </Button>

            <Text fontSize="1.4rem" color="gray.400">
              <Link
                as={NextLink}
                href={ROUTES.SIGN_IN}
                color="blue.300"
                fontWeight="medium"
                _hover={{ textDecoration: 'underline' }}
              >
                Back to Login
              </Link>
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

export default Verify2fa;
