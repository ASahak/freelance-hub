import { Flex } from '@chakra-ui/react';
import SignUp from '@/containers/auth/signUp';

export default function SignUpPage() {
  return (
    <Flex w="full" h="100dvh" align="center" justify="center" bg="gray.50">
      <SignUp />
    </Flex>
  );
}
