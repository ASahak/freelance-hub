'use client';

import { useEffect } from 'react';
import {
  Flex,
  Heading,
  Text,
  Button,
  VStack,
  Icon,
  ButtonGroup,
} from '@chakra-ui/react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service or the console for debugging.
    console.error(error);
  }, [error]);

  return (
    <Flex
      as="main"
      minH="100vh"
      w="full"
      alignItems="center"
      justifyContent="center"
      bg="gray.100"
      px={4}
    >
      <VStack
        spacing={6}
        p={8}
        bg="white"
        rounded="lg"
        shadow="xl"
        textAlign="center"
        maxW="xl"
        mx="auto"
      >
        <Flex
          w="4rem"
          h="4rem"
          alignItems="center"
          justifyContent="center"
          rounded="full"
          bg="red.100"
          color="red.400"
        >
          <Icon
            as="svg"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            boxSize={8}
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </Icon>
        </Flex>

        <VStack spacing={2}>
          <Heading as="h1" size="lg" color="gray.800">
            Oops! Something went wrong.
          </Heading>
          <Text color="gray.600" fontSize="1.6rem" textAlign="center">
            We encountered an unexpected issue. Please try again or return to
            the homepage.
          </Text>
        </VStack>

        <ButtonGroup spacing={4}>
          <Button variant="outline" onClick={() => reset()}>
            Try Again
          </Button>
          <Button as="a" href="/" variant="primary">
            Go Home
          </Button>
        </ButtonGroup>
      </VStack>
    </Flex>
  );
}
