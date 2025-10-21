'use client';

import { VStack, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { ROUTES } from '@/common/constants/routes';

const NotFound = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      pathname,
    );
  }, [pathname]);

  return (
    <Flex w="full" alignItems="center" justifyContent="center" h="100dvh">
      <VStack spacing={6} textAlign="center">
        <Heading size="4xl" color="gray.500">
          404
        </Heading>
        <Text fontSize="3xl" color="gray.600">
          Oops! Page not found
        </Text>
        <Button
          variant="primary"
          onClick={() => router.push(ROUTES.HOME)}
          size="lg"
        >
          Return to Home
        </Button>
      </VStack>
    </Flex>
  );
};

export default NotFound;
