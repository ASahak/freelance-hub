import { Flex } from '@chakra-ui/react';
import ForgotPassword from '@/containers/auth/forgotPassword';

export default function ForgotPasswordPage() {
  return (
    <Flex w="full" h="100dvh" align="center" justify="center" bg="gray.50">
      <ForgotPassword />
    </Flex>
  );
}
